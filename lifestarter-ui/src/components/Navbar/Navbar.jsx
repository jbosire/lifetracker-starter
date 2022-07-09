import * as React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(props) {
  const handleOnClick = () =>{
    if(props.isLoggedIn){
      props.setIsLoggedIn(false)
    }
  }
  return (
    <nav className="navbar">
      <Logo className="logo" />

      <ul className="link">
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>
          <Link to={props.isLoggedIn ? "/activity" : "/login"}> Activity </Link>
        </li>
        <li>
          <Link to={props.isLoggedIn ? "/exercise" : "/login"}> Exercise </Link>
        </li>
        <li>
          <Link to={props.isLoggedIn ? "/nutrition" : "/login"}> Nutrition </Link>
        </li>
        <li>
          <Link to={props.isLoggedIn ? "/sleep" : "/login"}>Sleep</Link>
        </li>
        
        <li className={props.isLoggedIn ? "login close" : "login"}>
          <Link to="/login">Login</Link>
        </li>
        {props.isLoggedIn ? (
           <Link to="/register">
           <li className="secondary btn" onClick={handleOnClick}>        
             <span> Sign out</span>     
           </li>
           </Link>
        ) : (
            <Link to="/register">
          <li className="secondary btn"  onClick={handleOnClick}>        
            <span> Sign Up</span>     
          </li>
          </Link>
        )}
      </ul>
    </nav>
  );
}
