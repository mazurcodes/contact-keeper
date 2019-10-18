import React, { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contacts/ContactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  const contactList = (filtered || contacts).map(contact => (
    <CSSTransition timeout={550} classNames="item" key={contact.id}>
      <ContactItem contact={contact} />
    </CSSTransition>
  ));
  return <TransitionGroup>{contactList}</TransitionGroup>;
};

export default Contacts;
