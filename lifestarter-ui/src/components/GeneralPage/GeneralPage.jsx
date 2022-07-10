import * as React from "react";
import { Link } from "react-router-dom";
import GeneralCard from "../GeneralCard/GeneralCard";

import "./GeneralPage.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function GeneralPage(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const emptyPage = (
    <div className="empty">
      <div class="hero">
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
    //  props.setIsLoading(true);

    const getNutrition = async () => {
      let nutritionUrl = `http://localhost:3001/nutrition/` + props.sessionId;

      try {
        let nutritionResponse = await axios.get(nutritionUrl);

        let data = nutritionResponse.data.nutrition;
        props.setNutrition(data);
      } catch (e) {
        console.log(e);
      }
    };

    const getSleep = async () => {
      let sleepUrl = `http://localhost:3001/sleep/` + props.sessionId;

      try {
        let sleepResponse = await axios.get(sleepUrl);
        let data = sleepResponse.data.sleep;
        props.setSleep(data);
      } catch (e) {
        console.log(e);
      }
    };

    const getExercise = async () => {
      let exerciseUrl = `http://localhost:3001/exercise/` + props.sessionId;

      try {
        let exerciseResponse = await axios.get(exerciseUrl);
        let data = exerciseResponse.data.exercise;
        props.setExercise(data);
      } catch (e) {
        console.log(e);
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
