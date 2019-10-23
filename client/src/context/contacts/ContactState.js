import React, { useReducer } from "react";
import uuid from "uuid";
import axios from "axios";
import ContactContext from "./ContactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

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
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact

  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete contact

  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set current contact

  const setCurrent = id => {
    dispatch({ type: SET_CURRENT, payload: id });
  };

  // Clear current contact

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update contact
  const editContact = newContact => {
    dispatch({ type: UPDATE_CONTACT, payload: newContact });
  };

  // Filter contact
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        editContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        current: state.current,
        filterContacts,
        clearFilter,
        filtered: state.filtered
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
