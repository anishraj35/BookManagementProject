import { Link, NavLink } from 'react-router-dom'
export default function Navbar () {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Book Manager</Link>
        <div>
          <NavLink className="btn btn-outline-light me-2" to="/">Home</NavLink>
          <NavLink className="btn btn-success" to="/add">Add Book</NavLink>
        </div>
      </div>
    </nav>
  )
}
