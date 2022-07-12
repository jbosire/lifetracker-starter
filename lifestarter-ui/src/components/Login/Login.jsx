import * as React from "react";
import "./Login.css";
import { useState } from "react";

import apiClient from "../../services/apiClient";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") < 1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "password") {
      if (event.target.value.length < 1) {
        setErrors((e) => ({ ...e, password: "Please enter a your password." }));
      } else {
        setErrors((e) => ({ ...e, password: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.loginUser({
      email: form.email,
      password: form.password,
    });
    if (error) {
      setIsLoading(false);
      setErrors((e) => ({ ...e, form: error }));
      
    }
   
    if (data?.user) {
     
      props.setName(data.user.firstName);
     

      setIsLoading(false);
      props.setIsLoggedIn(true);
      props.setIsClicked(false);
      navigate("/activity");
      apiClient.setToken(data.token);
    }
  };

  return (
    <div className="Login">
      <div className="card">
        {!props.isLoggedIn && props.isClicked ? (
          <h1 className="logError">Must be logged in to view this page</h1>
        ) : null}

        <h2>Login</h2>
        <br />
        <div className="form">
          {errors.form && <span className="error">{errors.form}</span>}
          <div className="input-field">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="doe@joram.com"
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input-field">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleOnInputChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button className="btn" onClick={handleOnSubmit}>
            {isLoading ? "Loading...." : "Log In"}
          </button>
        </div>
        <div className="footer">
          <p>Not registered yet? Sign up {<a href="/register"> here.</a>}</p>
        </div>
      </div>
    </div>
  );
}
