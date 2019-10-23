import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    case DELETE_CONTACT:
      const contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
      return {
        ...state,
        contacts
      };
    case UPDATE_CONTACT:
      const updatedContacts = state.contacts.map(contact =>
        contact.id === action.payload.id ? action.payload : contact
      );

      return {
        ...state,
        contacts: updatedContacts,
        current: null
      };

    case SET_CURRENT:
      const contact = state.contacts.filter(
        contact => contact.id === action.payload
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
        }
    default:
      break;
  }
};
