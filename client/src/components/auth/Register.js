import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Register = props => {
  const { register, errors, clearErrors, isAuthenticated } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  const initialUser = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };

  const [user, setUser] = useState(initialUser);
  const { name, email, password, password2 } = user;
  
  useEffect(() => {
    if (isAuthenticated) {
      setAlert("User registered successfuly", "success");
      props.history.push('/');
    } else if (errors === "User with this email already exist") {
      setAlert(errors, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [errors, isAuthenticated, props.history]);

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords dosn't match", "danger");
    } else {
      register(user);

    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Choose password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm password: </label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
