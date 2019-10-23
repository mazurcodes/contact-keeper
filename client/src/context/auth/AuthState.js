import React, { useReducer } from 'react';
import AuthContext from "../auth/authContext";
import authReducer from "../auth/authReducer";
import {REGISTER_SUCCESS} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    errors: null,
  }

  const [state, dispath] = useReducer(authReducer, initialState);

  // Load user

  
  // Register user
  

  // Login user


  // Logout


  // Clear errors

  return (
    <AuthContext.Provider value={{
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      user: state.user,
      errors: state.errors,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
