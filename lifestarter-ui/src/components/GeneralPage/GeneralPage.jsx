import * as React from "react";
import { Link } from "react-router-dom";
import GeneralCard from "../GeneralCard/GeneralCard";
import GeneralForm from "../GeneralForm/GeneralForm";
import "./GeneralPage.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function GeneralPage(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nutrition, setNutrition] = useState([]);
  const [sleep, setSleep] = useState([]);
  const [exercise, setExercise] = useState([]);



  useEffect(() => {
    //  props.setIsLoading(true);
  
      const getNutrition = async () => {
        let nutritionUrl = `http://localhost:3001/nutrition`;
  
        try {
          let nutritionResponse = await axios.get(nutritionUrl);
          let data = nutritionResponse.data.nutritions
          setNutrition(data)
  
        } catch (e) {
          console.log(e);
          
        }
      };
  
      const getSleep = async () => {
        let sleepUrl = `http://localhost:3001/sleep`;
  
        try {
          let sleepResponse = await axios.get(sleepUrl);
          let data = sleepResponse.data.sleeps
          setSleep(data)
  
        } catch (e) {
          console.log(e);
          
        }
      };
  
      const getExercise = async () => {
        let exerciseUrl = `http://localhost:3001/exercise`;
  
        try {
          let exerciseResponse = await axios.get(exerciseUrl);
          let data = exerciseResponse.data.exercises
          setExercise(data)
  
        } catch (e) {
          console.log(e);
          
        }
      };
  
      getNutrition()
      getSleep()
      getExercise()
  
  
    }, []);
    
    

  return (
    <div className="GeneralPage">
      <div className="Banner">
        <h1>{props.pageType}</h1>
      </div>
      <div className="content">
        <div className="GeneralPageOverview">
          <div className="header">
            <h3>Overview</h3>
            <Link to={"./create"}>
              <button className="Button outline small outline aqua">
                {" "}
                Record {props.pageType}
              </button>
            </Link>
          </div>
          <div className="feed">
            <div className="empty">
              <h2>Nothing here yet.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
