import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT token
    Cookies.remove("jwtToken");
    // Navigate to the login page after logout
    navigate("/Login");
  };

  return (
    <nav className="main-navbar">
      <ul className="navbar-cont">
        <li className="nav-items">
          <div className="heading-logo d-flex flex-row justify-content-center align-items-center">
            <Link to="/">
              <img src="src/assets/Logo.png" alt="Logo" width="90px" />
            </Link>
            <Link to="/">
              <h1>ShineHire</h1>
            </Link>
          </div>
        </li>
        <li className="nav-items">
          <Link className="me-5" to="/">HOME</Link>
          <Link className="me-5" to="/Jobs">JOBS</Link>
          <Link to="/Profile">PROFILE</Link>
        </li>
        <li className="nav-items">
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
