import React, { useReducer } from "react";
import AuthContext from "../auth/authContext";
import authReducer from "../auth/authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken"; 
import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    errors: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get("api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.error,
      })
    }
  };

  // Register user
  const register = async user => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users", user, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.error
      });
    }
    loadUser();
  };

  // Login user
  const loginUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/auth", {email: user.email, password: user.password}, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error
      });
    }
    loadUser();
  };

  // Logout
  const logoutUser = () => {
    dispatch({
      type: LOGOUT,
    })
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        errors: state.errors,
        register,
        loginUser,
        logoutUser,
        loadUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
