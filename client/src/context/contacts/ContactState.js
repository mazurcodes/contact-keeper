import React, { useReducer } from "react";
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
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_ERRORS,
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);


  // Headers config for axios

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Get uset contacts

  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.error,
      })
    }
  }

  // Add contact

  const addContact = async contact => {

    try {
      const res = await axios.post("/api/contacts", contact, config);
      // response from server with contact is then saved to the state
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.error,
      })
    }
  };



  // Delete contact

  const deleteContact = async id => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: res.data._id });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.error,
      })
    }
  };


  
  // Update contact
  const editContact = async newContact => {
    try {
      const res = await axios.put(`/api/contacts/${newContact._id}`, newContact, config);

      // response from server with contact is then saved to the state
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.error,
      })
    }
  };




  // Set current contact

  const setCurrent = id => {
    dispatch({ type: SET_CURRENT, payload: id });
  };





  // Clear current contact

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };




  // Filter contact
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };




  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };





  // Clear contacts after logout
  const clearContacts = () => {
    dispatch({type: CLEAR_CONTACTS});
  };
  
  const clearErrors = () => {
    dispatch({type: CLEAR_ERRORS});
  };



  
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        getContacts,
        clearContacts,
        addContact,
        editContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        current: state.current,
        error: state.error,
        clearErrors,
        filterContacts,
        clearFilter,
        filtered: state.filtered,
        loading: state.loading,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
