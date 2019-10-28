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
  CLEAR_CONTACTS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false
      };
    case DELETE_CONTACT:
      const contacts = state.contacts.filter(
        contact => contact._id !== action.payload
      );
      return {
        ...state,
        contacts,
        loading: false
      };
    case UPDATE_CONTACT:
      const updatedContacts = state.contacts.map(contact =>
        contact._id === action.payload._id ? action.payload : contact
      );

      return {
        ...state,
        contacts: updatedContacts,
        current: null,
        loading: false
      };

    case SET_CURRENT:
      const contact = state.contacts.filter(
        contact => contact._id === action.payload
      );
      return {
        ...state,
        current: contact[0]
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_CONTACTS:
      const filtered = state.contacts.filter(contact => {
        const regex = new RegExp(`${action.payload}`, "gi");
        return contact.name.match(regex) || contact.email.match(regex);
      });
      return {
        ...state,
        filtered
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: [],
        loading: true
      };
    default:
      break;
  }
};
