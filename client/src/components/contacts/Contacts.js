import React, { useContext } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contacts/ContactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;

  const contactList = contacts.map(contact => (
    <ContactItem contact={contact} key={contact.id} />
  ));
  return <>{contactList}</>;
};

export default Contacts;
