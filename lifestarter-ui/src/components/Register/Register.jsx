import * as React from "react";
import "./Register.css";
import { useState } from "react";
import apiClient from "../../services/apiClient";

import { Navigate, useNavigate } from "react-router-dom";

export default function Register(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") < 1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "firstName") {
      if (event.target.value.length === 0) {
        setErrors((e) => ({
          ...e,
          firstName: "Please enter your first name.",
        }));
      } else {
        setErrors((e) => ({ ...e, firstName: null }));
      }
    }

    if (event.target.name === "lastName") {
      if (event.target.value.length === 0) {
        setErrors((e) => ({ ...e, lastName: "Please enter your last name." }));
      } else {
        setErrors((e) => ({ ...e, lastName: null }));
      }
    }

    if (event.target.name === "username") {
      if (event.target.value.length === 0) {
        setErrors((e) => ({ ...e, username: "Please enter your username." }));
      } else {
        setErrors((e) => ({ ...e, username: null }));
      }
    }

    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    const { data, error } = await apiClient.signupUser({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.username,
    });
    if (error) setErrors((e) => ({ ...e, form: error }));
    if (data?.user) {
      props.setSessionId(data.user.id);
      props.setName(data.user.firstName);
      console.log(data.user);
      props.setIsLoggedIn(true);
      props.setIsClicked(false);
      navigate("/activity");
      setIsLoading(false);
      apiClient.setToken(data.token);
    }

  };

  return (
    <div className="Register">
      <div className="card">
        <h2>Sign Up</h2>
        <br />
        <div className="form">
          {errors.form && <span className="error">{errors.form}</span>}
          <div className="input-field">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter valid email eg. doe@joram.com"
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="split-input-field">
            <div className="input-field">
              <label for="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                onChange={handleOnInputChange}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>

            <div className="input-field">
              <label for="lastName"> Last Name </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                onChange={handleOnInputChange}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
          </div>
          <div className="input-field">
            <label for="username">Username</label>
            <input
              type="text"
              onChange={handleOnInputChange}
              name="username"
              placeholder="your username"
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div className="input-field">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleOnInputChange}
            />
          </div>

          <div className="input-field">
            <label for="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm your password"
              onChange={handleOnInputChange}
            />
            {errors.passwordConfirm && (
              <span className="error">{errors.passwordConfirm}</span>
            )}
          </div>
          <button className="btn" onClick={handleOnSubmit}>
            {isLoading ? "Loading...." : "Create Account"}
          </button>
        </div>

        <div className="footer">
          <p>
            Have an account? Login
            <a href="/login"> here.</a>
          </p>
        </div>
      </div>
    </div>
  );
}
