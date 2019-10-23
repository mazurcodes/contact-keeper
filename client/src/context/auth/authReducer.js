import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {};
    case REGISTER_FAIL:
      return {};
    case USER_LOADED:
      return {};
    case AUTH_ERROR:
      return {};
    case LOGIN_SUCCESS:
      return {};
    case LOGIN_FAIL:
      return {};
    case LOGOUT:
      return {};
    case CLEAR_ERRORS:
      return {};
    default:
      return {
        ...state
      };
  }
};
