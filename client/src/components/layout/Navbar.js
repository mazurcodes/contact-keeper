import React, { useContext } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contacts/ContactContext"

const Navbar = ({ title, icon }) => {
  const { isAuthenticated, user, logoutUser } = useContext(AuthContext);

  const { clearContacts } = useContext(ContactContext);

  const onLogout = () => {
    logoutUser();
    clearContacts();
  }
  
  const register = (
    <>
      <li>
        <NavLink
          exact
          to="/register"
          activeStyle={{ textDecoration: "underline", fontWeight: "bold" }}
        >
          Register
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/login"
          activeStyle={{ textDecoration: "underline", fontWeight: "bold" }}
        >
          Login
        </NavLink>
      </li>
    </>
  );

  const authenticated = (
    <>
      <li>
        Hello {user && user.name}
      </li>
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  )
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <nav>
        <ul>
          {isAuthenticated ? authenticated : register}
        </ul>
      </nav>
    </div>
  );
};

Navbar.defaultProps = {
  title: " Contact Keeper",
  icon: "fas fa-address-card"
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

export default Navbar;
