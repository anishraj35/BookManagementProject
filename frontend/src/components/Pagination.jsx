export default function Pagination ({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null
  const pages = [...Array(totalPages).keys()]
  return (
    <nav>
      <ul className="pagination">
        {pages.map(p => (
          <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(p)}>
              {p + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
