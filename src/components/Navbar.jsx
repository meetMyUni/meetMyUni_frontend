
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span>meetmyuni</span>
        <small>YOUR STUDY JOURNEY STARTS HERE</small>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>

        <NavLink to="/study-abroad" className={({ isActive }) => isActive ? "active" : ""}>
          Study Abroad
        </NavLink>

        <NavLink to="/online-mba" className={({ isActive }) => isActive ? "active" : ""}>
          Online MBA
        </NavLink>

        <NavLink to="/mbbs" className={({ isActive }) => isActive ? "active" : ""}>
          MBBS
        </NavLink>

        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
          Contact Us
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
