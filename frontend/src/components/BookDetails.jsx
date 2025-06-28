import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBook, googleDetails } from '../api/books'
import { Nav, Modal, Button } from 'react-bootstrap'

export default function BookDetails () {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [google, setGoogle] = useState(null)
  const [showMore, setShowMore] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Fetch book data from backend + Google Books API
  useEffect(() => {
    getBook(id)
      .then(res => {
        setBook(res.data)
        return googleDetails(res.data.isbn)
      })
      .then(res => setGoogle(res.data))
      .catch(console.error)
  }, [id])

  if (!book) return <p>Loading …</p>

  const volume = google?.items?.[0]?.volumeInfo

  return (
    <>
      <Link to="/" className="btn btn-secondary mb-3">← Back to list</Link>

      {/* Tab-like UI */}
      <Nav variant="tabs" activeKey={showMore ? 'more' : 'basic'}>
        <Nav.Item>
          <Nav.Link eventKey="basic" onClick={() => setShowMore(false)}>
            Basic Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="more" onClick={() => setShowMore(prev => !prev)}>
            More Details
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Always visible basic info */}
      <ul className="list-group mt-3">
        <li className="list-group-item"><strong>Title:</strong> {book.title}</li>
        <li className="list-group-item"><strong>Author:</strong> {book.author}</li>
        <li className="list-group-item"><strong>Genre:</strong> {book.genre}</li>
        <li className="list-group-item"><strong>Publication:</strong> {book.publicationDate}</li>
        <li className="list-group-item"><strong>ISBN:</strong> {book.isbn}</li>
        <li className="list-group-item"><strong>Rating:</strong> {book.rating}</li>
      </ul>

      {/* Conditional More Details */}
      {showMore && (
        <div className="mt-4">
          {volume ? (
            <>
              {volume.imageLinks?.thumbnail && (
                <img
                  src={volume.imageLinks.thumbnail}
                  alt="cover"
                  className="mb-3"
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => setShowModal(true)}
                />
              )}
              <p>{volume.description || 'No description available.'}</p>
            </>
          ) : (
            <p>No extra information found for this ISBN.</p>
          )}
        </div>
      )}

      {/* Enlarge Image Modal */}
      <EnlargeModal
        show={showModal}
        onHide={() => setShowModal(false)}
        volume={volume}
      />
    </>
  )
}

// Modal Component
function EnlargeModal ({ show, onHide, volume }) {
  if (!volume) return null

  const large =
    volume.imageLinks?.extraLarge ||
    volume.imageLinks?.large ||
    volume.imageLinks?.medium ||
    volume.imageLinks?.thumbnail

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Body className="text-center">
        <img
          src={large}
          alt="Large Cover"
          style={{ maxWidth: '25vw', width: '100%' }}
        />
        <div className="mt-3 text-start" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
          <h5>{volume.title}</h5>
          {volume.description
            ? <p>{volume.description}</p>
            : <p>No description available.</p>
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
