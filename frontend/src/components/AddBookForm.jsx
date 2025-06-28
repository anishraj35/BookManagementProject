import { useForm } from 'react-hook-form'
import { addBook } from '../api/books'
import { useNavigate } from 'react-router-dom'

export default function AddBookForm () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

  /* ───────────────────── submit handler ───────────────────── */
  const onSubmit = data =>
    addBook(data)
      .then(() => navigate('/'))
      .catch(err =>
        alert(err.response?.data?.error || err.response?.data || err.message)
      )

  /* ──────────────────────── UI ─────────────────────────────── */
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">

      {/* Title */}
      <div className="col-md-6">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          {...register('title', { required: true, maxLength: 100 })}
        />
        {errors.title && (
          <div className="text-danger small">Title is required (≤100 chars)</div>
        )}
      </div>

      {/* Author */}
      <div className="col-md-6">
        <label className="form-label">Author</label>
        <input
          className="form-control"
          {...register('author', { required: true, maxLength: 50 })}
        />
        {errors.author && (
          <div className="text-danger small">
            Author is required (≤50 chars)
          </div>
        )}
      </div>

      {/* Publication Date */}
      <div className="col-md-6">
        <label className="form-label">Publication Date</label>
        <input
          type="date"
          className="form-control"
          {...register('publicationDate', { required: true })}
        />
        {errors.publicationDate && (
          <div className="text-danger small">Required</div>
        )}
      </div>

      {/* ISBN */}
      <div className="col-md-6">
        <label className="form-label">ISBN (13 digits)</label>
        <input
          className="form-control"
          {...register('isbn', {
            required: true,
            pattern: /^\d{13}$/
          })}
        />
        {errors.isbn && (
          <div className="text-danger small">Must be exactly 13 digits</div>
        )}
      </div>

      {/* Genre dropdown */}
      <div className="col-md-6">
        <label className="form-label">Genre</label>
        <select
          className="form-select"
          defaultValue=""
          {...register('genre', { required: true })}
        >
          <option value="" disabled>
            Choose…
          </option>
          {[
            'Fiction',
            'Non-Fiction',
            'Mystery',
            'Fantasy',
            'Romance',
            'Sci-Fi',
            'Others'
          ].map(g => (
            <option key={g} value={g.toUpperCase().replace('-', '_')}>
              {g}
            </option>
          ))}
        </select>
        {errors.genre && (
          <div className="text-danger small">Please select a genre</div>
        )}
      </div>

      {/* Rating */}
      <div className="col-md-6">
        <label className="form-label">Rating (1 – 5)</label>
        <input
          type="number"
          className="form-control"
          min={1}
          max={5}
          {...register('rating', { required: true, min: 1, max: 5 })}
        />
        {errors.rating && (
          <div className="text-danger small">Enter 1 – 5</div>
        )}
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </div>
    </form>
  )
}
