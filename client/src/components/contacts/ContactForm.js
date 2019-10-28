import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contacts/ContactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, editContact } = contactContext;

  const initialContact = {
    name: "",
    email: "",
    phone: "",
    type: "personal"
  };

  const [contact, setContact] = useState(initialContact);

  // contact state should be set to current whenever current changes
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
    // eslint-disable-next-line
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addContact(contact);
    setContact(initialContact);
  };

  const onUpdate = e => {
    e.preventDefault();
    editContact(contact);
  };
  
  const onClear = (e) => {
    e.preventDefault();
    clearCurrent();
  };

  return (
    <>
      <form onSubmit={current ? onUpdate : onSubmit}>
        <h2 className="text-primary">
          {current ? "Edit contact" : "Add contact"}
        </h2>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={name}
          required
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          value={email}
          required
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="phone"
          name="phone"
          value={phone}
          onChange={onChange}
        />
        <label>
          <input
            type="radio"
            name="type"
            value="personal"
            checked={type === "personal"}
            onChange={onChange}
          />{" "}
          Personal
        </label>{" "}
        <label>
          <input
            type="radio"
            name="type"
            value="professional"
            checked={type === "professional"}
            onChange={onChange}
          />{" "}
          Professional
        </label>
        <p>
          <input
            type="submit"
            className="btn btn-danger btn-block"
            value={current ? "Update" : "Submit"}
          />
        </p>
      </form>
      <p>
        <button className="btn btn-light btn-block" onClick={onClear}>
          Clear
        </button>
      </p>
    </>
  );
};

export default ContactForm;
