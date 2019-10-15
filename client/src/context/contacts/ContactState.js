import React, { useReducer } from "react";
import uuid from "uuid";
import axios from "axios";
import ContactContext from "./ContactContext";
import contactReducer from "./contactReducer";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Bartmiej Mazur",
        email: "ab.mazur@gmial.com",
        phone: "111-111-1111",
        type: "personal"
      },
      {
        id: 2,
        name: "Basia Domagała",
        email: "domagała@gmial.com",
        phone: "222-222-2222",
        type: "personal"
      },
      {
        id: 3,
        name: "Piotr Romański",
        email: "henloromek@gmial.com",
        phone: "333-333-3333",
        type: "professional"
      },
      {
        id: 4,
        name: "Piotr Kubik",
        email: "kubik@gmial.com",
        phone: "444-444-4444",
        type: "personal"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact

  const addContact = (name, email, phone, type) => {
    
  }

  // Delete contact

  // Set current contact

  // Update contact

  // Filter contact

  // Clear contact

  return (
    <ContactContext.Provider value={{contacts: state.contacts}}>
      {props.children}
    </ContactContext.Provider>
  );
};


export default ContactState;