import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <nav>
        <ul>
          <li>
          <NavLink exact to="/" activeStyle={{textDecoration: "underline", fontWeight: "bold"}}>Home</NavLink>
          </li>
          <li>
            <NavLink exact to="/about" activeStyle={{textDecoration: "underline", fontWeight: "bold"}}>About</NavLink>
          </li>
          <li>
            <NavLink exact to="/register" activeStyle={{textDecoration: "underline", fontWeight: "bold"}}>Register</NavLink>
          </li>
          <li>
            <NavLink exact to="/login" activeStyle={{textDecoration: "underline", fontWeight: "bold"}}>Login</NavLink>
          </li>
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
