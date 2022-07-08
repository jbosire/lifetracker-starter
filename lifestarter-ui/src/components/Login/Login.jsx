import * as React from "react";
import "./Login.css";
import {useState} from "react"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading,setIsLoading] = useState(false)



  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") < 1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }


    if(event.target.name === "password"){
      if(event.target.value.length < 1){
        setErrors((e) => ({ ...e, password: "Please enter a your password." }));
      } else {
        setErrors((e) => ({ ...e, password: null }));

      }

    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  }


  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, {
        password: form.password,
        email: form.email,
      })
      if (res?.data) {
      //  setAppState(res.data)
        setIsLoading(false)
        props.setIsLoggedIn(true)
        navigate("/activity")
      } else {
        setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
      setIsLoading(false)
    }
  }
    
  return (
    <div className="Login">
      <div className="card">
        <h2>Login</h2>
        <br/>
        <div className="form">
        {errors.form && <span className="error">{errors.form}</span>}
          <div className="input-field">
            <label for="email">Email</label>
            <input type="email" name="email" placeholder="doe@joram.com" onChange={handleOnInputChange}/>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input-field">
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="password" onChange={handleOnInputChange}/>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button className="btn" onClick={handleOnSubmit}>{isLoading ? "Loading...." : "Log In"}</button>
        </div>
        <div className="footer">
          <p>Not registered yet? Sign up {<a href="/register"> here.</a>}</p>
        </div>
      </div>
     
    </div>
  );
}