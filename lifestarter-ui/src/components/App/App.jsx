import * as React from "react";
import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import NotFound from "../NotFound/NotFound";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Activity from "../Activity/Activity";
import GeneralPage from "../GeneralPage/GeneralPage";
import Login from "../Login/Login";
import Register from "../Register/Register";
import GeneralForm from "../GeneralForm/GeneralForm";
import axios from "axios";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [nutrition, setNutrition] = useState([]);
  const [sleep, setSleep] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [name, setName] = useState("joram")

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Navbar
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setSessionId={setSessionId}
            sessionId={sessionId}
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/activity"
              element={
                <GeneralPage
                name={name}
                setName = {setName}
                pageType="Activity"
                  setSessionId={setSessionId}
                  sessionId={sessionId}
                  nutrition={nutrition}
                  setNutrition={setNutrition}
                  sleep={sleep}
                  setSleep={setSleep}
                  exercise={exercise}
                  setExercise={setExercise}
                />
              }
            />
            <Route
              path="/exercise"
              element={
                <GeneralPage
                  pageType="Exercise"
                  sessionId={sessionId}
                  nutrition={nutrition}
                  setNutrition={setNutrition}
                  sleep={sleep}
                  setSleep={setSleep}
                  exercise={exercise}
                  setExercise={setExercise}
                />
              }
            />
            <Route
              path="/nutrition"
              element={
                <GeneralPage
                  pageType="Nutrition"
                  sessionId={sessionId}
                  nutrition={nutrition}
                  setNutrition={setNutrition}
                  sleep={sleep}
                  setSleep={setSleep}
                  exercise={exercise}
                  setExercise={setExercise}
                />
              }
            />
            <Route
              path="/sleep"
              element={
                <GeneralPage
                  pageType="Sleep"
                  sessionId={sessionId}
                  nutrition={nutrition}
                  setNutrition={setNutrition}
                  sleep={sleep}
                  setSleep={setSleep}
                  exercise={exercise}
                  setExercise={setExercise}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setSessionId={setSessionId}
                  sessionId={sessionId}
                  name={name}
                  setName={setName}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setSessionId={setSessionId}
                  sessionId={sessionId}
                  name={name}
                  setName={setName}
                />
              }
            />
            <Route
              path="/sleep/create"
              element={<GeneralForm formType="Sleep" sessionId={sessionId} />}
            />
            <Route
              path="/nutrition/create"
              element={
                <GeneralForm formType="Nutrition" sessionId={sessionId} />
              }
            />
            <Route
              path="/exercise/create"
              element={
                <GeneralForm formType="Exercise" sessionId={sessionId} />
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
