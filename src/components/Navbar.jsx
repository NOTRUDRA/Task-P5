
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        DEV@Deakin
      </Link>

      <div className="navbar-search">
        <span className="navbar-search-icon"></span>
        <input type="text" placeholder="Search..." />
      </div>

      <div className="navbar-actions">
        <span className="navbar-action">Post</span>

        <Link to="/login" className="navbar-action">
          Login
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
