import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contacts/ContactContext";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  const contactList = (filtered || contacts).map(contact => (
    <CSSTransition timeout={550} classNames="item" key={contact._id}>
      <ContactItem contact={contact} />
    </CSSTransition>
  ));

  return (
    <>
      {contacts.length === 0 && loading ? <Spinner /> : <TransitionGroup>{contactList}</TransitionGroup>}
    </>
  );
};

export default Contacts;
