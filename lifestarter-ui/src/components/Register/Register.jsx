import * as React from "react";
import "./Register.css";

export default function Register() {
  return (
    <div className="Register">
      <div className="card">
        <h2>Sign Up</h2>
        <br />
        <div className="form">
          <div className="input-field">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter valid email eg. doe@joram.com"
            />
          </div>
          <div className="split-input-field">
            <div className="input-field">
              <label for="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
              />
            </div>

            <div className="input-field">
              <label for="lastName"> Last Name </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="input-field">
            <label for="username">Username</label>
            <input type="text" name="username" placeholder="your username" />
          </div>

          <div className="input-field">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>

          <div className="input-field">
            <label for="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm your password"
            />
          </div>
          <button className="btn"> Create Account</button>
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
