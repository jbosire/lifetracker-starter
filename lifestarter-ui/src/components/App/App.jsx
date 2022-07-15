import * as React from "react";
import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import NotFound from "../NotFound/NotFound";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import GeneralPage from "../GeneralPage/GeneralPage";
import Login from "../Login/Login";
import Register from "../Register/Register";
import GeneralForm from "../GeneralForm/GeneralForm";
import apiClient from "../../services/apiClient";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [nutrition, setNutrition] = useState([]);
  const [sleep, setSleep] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [name, setName] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});

  //console.log(localStorage.getItem("lifestarter_token"))

  // useEffect(() => {
  //   const fetchAuthedUser = async () => {
  //     const { data, error } = await apiClient.fetchUserFromToken();
  //     if (data) setUser(data.user);
  //    // if (error) setError(error);
  //   };

  //   const token = localStorage.getItem("lifestarter_token");
  // //  console.log(token)
  //   if (token) {
  //     apiClient.setToken(token);
  //     fetchAuthedUser();
  //   }
  // }, []);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("lifestarter_token");

      if (token) {
        apiClient.setToken(token);
        const response = await apiClient.fetchUserFromToken();

        console.log("what is this ", response);
      }
    };

    getUser();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Navbar
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setIsClicked={setIsClicked}
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/activity"
              element={
                <GeneralPage
                  isClicked={isClicked}
                  name={name}
                  setName={setName}
                  pageType="Activity"
                  stats={stats}
                  setStats={setStats}
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
                  nutrition={nutrition}
                  setNutrition={setNutrition}
                  sleep={sleep}
                  setSleep={setSleep}
                  exercise={exercise}
                  setExercise={setExercise}
                  stats={stats}
                  setStats={setStats}
                />
              }
            />
            <Route
              path="/nutrition"
              element={
                <GeneralPage
                  pageType="Nutrition"
                  nutrition={nutrition}
                  setNutrition={setNutrition}
                  sleep={sleep}
                  setSleep={setSleep}
                  exercise={exercise}
                  setExercise={setExercise}
                  stats={stats}
                  setStats={setStats}
                />
              }
            />
            <Route
              path="/sleep"
              element={
                <GeneralPage
                  pageType="Sleep"
                  nutrition={nutrition}
                  setNutrition={setNutrition}
                  sleep={sleep}
                  setSleep={setSleep}
                  exercise={exercise}
                  setExercise={setExercise}
                  stats={stats}
                  setStats={setStats}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  name={name}
                  setName={setName}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  setIsClicked={setIsClicked}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  name={name}
                  setName={setName}
                />
              }
            />
            <Route
              path="/sleep/create"
              element={<GeneralForm formType="Sleep" />}
            />
            <Route
              path="/nutrition/create"
              element={<GeneralForm formType="Nutrition" />}
            />
            <Route
              path="/exercise/create"
              element={<GeneralForm formType="Exercise" />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
