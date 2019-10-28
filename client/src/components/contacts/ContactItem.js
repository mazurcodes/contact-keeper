import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contacts/ContactContext";

const ContactItem = ({ contact: { _id, name, email, phone, type } }) => {
  const { deleteContact, setCurrent, clearCurrent } = useContext(ContactContext);

  const onDelete = () => {
    clearCurrent();
    deleteContact(_id);
  }

  const onEdit = () => setCurrent(_id);

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
          style={{ float: "right" }}
        >
          {type}
        </span>
      </h3>

      <ul>
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
