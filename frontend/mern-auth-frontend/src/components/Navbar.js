import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // delete token
    navigate("/signin"); // redirect to signin
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          AuthGenAI
        </Link>

        {/* Collapse Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {token ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
