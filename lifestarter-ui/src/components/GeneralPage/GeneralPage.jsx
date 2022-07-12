import * as React from "react";
import { Link } from "react-router-dom";
import GeneralCard from "../GeneralCard/GeneralCard";

import "./GeneralPage.css";

import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";

export default function GeneralPage(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const emptyPage = (
    <div className="empty">
      <div className="hero">
        <img
          src="http://codepath-lifetracker.surge.sh/static/media/smartwatch-screen-digital-device.e2983a85.svg"
          alt="hero img"
        ></img>
        <h1>Kickstart your fitness journey!</h1>
        <p>Record your first Activity!</p>
      </div>
    </div>
  );

  useEffect(() => {
    const getNutrition = async () => {
      const { data, error } = await apiClient.getNutrition();
      
      if (data) {
        props.setNutrition(data.nutritions);
       
      }
    };

    const getSleep = async () => {
      const { data, error } = await apiClient.getSleep();

      if (data) {
        props.setSleep(data.sleeps);
       
      }
    };

    const getExercise = async () => {
      const { data, error } = await apiClient.getExercise();

      if (data) {
        props.setExercise(data.exercises);
       
      }
    };
    getNutrition();
    getSleep();
    getExercise();
  }, []);

  

  if (props.pageType === "Activity") {
    return (
      <div className="activity">
        <div className="GeneralPage">
          <div className="Banner">
            <h1>{"Welcome to your activity page " + props.name + "!"}</h1>
          </div>
          <div className="content">
            <div className="GeneralPageOverview">
              <div className="header">
                <h3>Lifetracks</h3>
                <div className="actButtons">
                  <Link to={"/nutrition/create"}>
                    <button className="Button outline small outline aqua">
                      {" "}
                      Record meal
                    </button>
                  </Link>
                  <Link to={"/sleep/create"}>
                    <button className="Button outline small outline aqua">
                      {" "}
                      Record rest time
                    </button>
                  </Link>
                  <Link to={"/exercise/create"}>
                    <button className="Button outline small outline aqua">
                      {" "}
                      Record exercise
                    </button>
                  </Link>
                </div>
              </div>
              <div className="feed">
                <GeneralCard cardType="Activity" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="GeneralPage">
      <div className="Banner">
        <h1>{props.pageType}</h1>
      </div>
      <div className="content">
        <div className="GeneralPageOverview">
          <div className="header">
            <h3>Lifestats</h3>
            <Link to={"./create"}>
              <button className="Button outline small outline aqua">
                {" "}
                Record {props.pageType}
              </button>
            </Link>
          </div>
          <div className="feed">
            {props.pageType === "Nutrition"
              ? props.nutrition?.length > 0
                ? props.nutrition.map((nutrient, idx) => {
                    return (
                      <GeneralCard
                        key={idx}
                        cardType="Nutrition"
                        item={nutrient}
                      />
                    );
                  })
                : emptyPage
              : props.pageType === "Sleep"
              ? props.sleep?.length > 0
                ? props.sleep.map((siesta, idx) => {
                    return (
                      <GeneralCard key={idx} cardType="Sleep" item={siesta} />
                    );
                  })
                : emptyPage
              : props.pageType === "Exercise"
              ? props.exercise?.length > 0
                ? props.exercise.map((exert, idx) => {
                    return (
                      <GeneralCard key={idx} cardType="Exercise" item={exert} />
                    );
                  })
                : emptyPage
              : emptyPage}
          </div>
        </div>
      </div>
    </div>
  );
}
