import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = props => {
  const { loginUser, isAuthenticated, errors, clearErrors } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  const initialUser = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialUser);
  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      setAlert("Login successful", "success");
      props.history.push('/');
    } else if (errors === "No such user") {
      setAlert(errors, "danger");
      clearErrors();
    } else if (errors === "Password don't match") {
      setAlert(errors, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [errors, isAuthenticated, props.history]);

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmit = e => {
    e.preventDefault();
    //alert if passwords don't match
    if (email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      loginUser(user);
  };
}
  
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" value={email} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Choose password: </label>
          <input type="password" name="password" value={password} onChange={onChange} required/>
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block"/>
      </form>
    </div>
  );
};

export default Login;
