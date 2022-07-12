import * as React from "react";
import "./LandingPage.css";


export default function LandingPage() {
  console.log(localStorage.getItem("lifestarter_token"))
    
  return (
    <div className="LandingPage">
      <div className="hero">
        <img src="http://codepath-lifetracker.surge.sh/static/media/smartwatch-screen-digital-device.e2983a85.svg" alt="hero img"></img>
        <h1>LIFE TRACKER</h1>
        <p>Eat Clean, Train Dirty</p>
      </div>
      <div className="tiles">
        <div className="tile">
          <img src="	http://codepath-lifetracker.surge.sh/static/media/icons-workout-48.4f4cdb05.svg" alt="fitness"></img>
          <p>Fitness</p>
        </div>
        <div className="tile">
          <img src="http://codepath-lifetracker.surge.sh/static/media/icons8-porridge-100.132d2715.svg" alt="food"></img>
          <p>Food</p>
        </div>
        <div className="tile">
          <img src="http://codepath-lifetracker.surge.sh/static/media/icons8-resting-100.81067336.svg" alt="rest"></img>
          <p>Rest</p>
        </div>
        <div className="tile">
          <img src="	http://codepath-lifetracker.surge.sh/static/media/icons8-planner-100.997ca54c.svg" alt="planner"></img>
          <p>Planner</p>
        </div>

      </div>
    
    </div>
  );
}