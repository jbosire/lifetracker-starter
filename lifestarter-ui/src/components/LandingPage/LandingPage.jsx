import * as React from "react";
//import { Link } from "react-router-dom";
import "./LandingPage.css";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";

export default function LandingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="LandingPage">
     <Navbar isLoggedIn={isLoggedIn}/>
    </div>
  );
}