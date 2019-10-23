import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const initialUser = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };

  const [user, setUser] = useState(initialUser);
  const { email, password } = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmit = e => {
    e.preventDefault();
    //alert if passwords don't match
    console.log("Register submit");
    // login(user);
  };
  
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
