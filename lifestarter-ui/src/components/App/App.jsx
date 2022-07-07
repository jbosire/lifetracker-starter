import * as React from "react";
import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import NotFound from "../NotFound/NotFound";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState,useEffect } from "react";
import Activity from "../Activity/Activity"
import Exercise from "../Exercise/Exercise"
import Nutrition from "../Nutrition/Nutrition"
import GeneralPage from "../GeneralPage/GeneralPage";
import Sleep from "../Sleep/Sleep"
import Login from "../Login/Login";
import Register from "../Register/Register"
import axios from "axios";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="app">
      
      <BrowserRouter>
        <main>
        <Navbar isLoggedIn={isLoggedIn}/>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/activity" element={<Activity/>} />
            <Route path="/exercise" element={<GeneralPage pageType="Exercise" />} />
            <Route path="/nutrition" element={<GeneralPage pageType="Nutrition" />} />
            <Route path="/sleep" element={<GeneralPage pageType="Sleep" />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
