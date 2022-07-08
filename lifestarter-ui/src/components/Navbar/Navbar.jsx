import * as React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(props) {
  return (
    <nav className="navbar">
      <Logo className="logo" />

      <ul className="link">
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>
          <Link to="/activity"> Activity </Link>
        </li>
        <li>
          <Link to="/exercise"> Exercise </Link>
        </li>
        <li>
          <Link to="/nutrition"> Nutrition </Link>
        </li>
        <li>
          <Link to="/sleep">Sleep</Link>
        </li>
        
        <li className={props.isLoggedIn ? "login close" : "login"}>
          <Link to="/login">Login</Link>
        </li>
        {props.isLoggedIn ? (
           <Link to="/register">
           <li className="secondary btn">        
             <span> Sign Up</span>     
           </li>
           </Link>
        ) : (
            <Link to="/register">
          <li className="secondary btn">        
            <span> Sign Up</span>     
          </li>
          </Link>
        )}
      </ul>
    </nav>
  );
}
