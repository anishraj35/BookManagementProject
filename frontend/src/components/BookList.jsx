import { useEffect, useState } from 'react'
import { getBooks, deleteBook } from '../api/books'
import { useNavigate } from 'react-router-dom'
import Pagination from './Pagination'

export default function BookList () {
  /* ───────────── state ───────────── */
  const [data, setData] = useState({ content: [], totalPages: 0, number: 0 })
  const [sort, setSort] = useState('title,asc')          // sort param
  const navigate = useNavigate()

  /* ───────────── helpers ─────────── */
  const load = (page = 0, s = sort) =>
    getBooks(page, 10, s).then(res => {
      setData(res.data)
      setSort(s)
    })

  // toggle ascending/descending for a column
  const toggleSort = field => {
    const [f, dir = 'asc'] = sort.split(',')
    const next = f === field && dir === 'asc' ? `${field},desc` : `${field},asc`
    load(0, next)  // reset to first page when sorting changes
  }

  const handleDelete = id =>
    deleteBook(id).then(() => load(data.number))

  /* ───────────── lifecycle ───────── */
  useEffect(() => { load() }, [])

  /* ───────────── render ──────────── */
  const sortIcon = field =>
    sort.startsWith(field) ? (sort.endsWith('asc') ? ' ▲' : ' ▼') : ''

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('title')}>
              Title{sortIcon('title')}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('author')}>
              Author{sortIcon('author')}
            </th>
            <th>ISBN</th>
            <th>Genre</th>
            <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('rating')}>
              Rating{sortIcon('rating')}
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.content.map(b => (
            <tr key={b.id}>
              <td>
                <button
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={() => navigate(`/books/${b.id}`)}
                >
                  {b.title}
                </button>
              </td>
              <td>{b.author}</td>
              <td>{b.isbn}</td>
              <td>{b.genre}</td>
              <td>{b.rating}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(b.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        page={data.number}
        totalPages={data.totalPages}
        onPageChange={p => load(p)}
      />
    </>
  )
}
