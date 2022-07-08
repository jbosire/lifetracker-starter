import * as React from "react";
import "./GeneralCard.css";


export default function GeneralCard(props) {
  return (
    <div className={"GeneralCard " + props.cardType} >
      <div className="card-header">
        {props.cardType === "Nutrition" ? (
          <img
            src="https://www.momontimeout.com/wp-content/uploads/2020/10/easy-chicken-piccata-recipe-square.jpg"
            alt="nutrition"
          />
        ) : null}
        <h2 className="tile">Joram Bosire</h2>
      </div>
      {props.cardType === "Nutrition" ? (
        <div className="card-stats">
          <div className="CardStat">
            <p>Calories</p>
            <span>1</span>
          </div>
          <div className="CardStat">
            <p>Quantity</p>
            <span>1</span>
          </div>
        </div>
      ) : null}

      {props.cardType === "Sleep" ? (
        <div className="card-stats">
          <div className="CardStat">
            <p>Start Time</p>
            <span>1</span>
          </div>
          <div className="CardStat">
            <p>End Time</p>
            <span>1</span>
          </div>
        </div>
      ) : null}

      {props.cardType === "Exercise" ? (
        <div className="card-stats">
          <div className="CardStat">
            <p>Duration</p>
            <span>1</span>
          </div>
          <div className="CardStat">
            <p>Intensity</p>
            <span>1</span>
          </div>
        </div>
      ) : null}

      {props.cardType != "Sleep" ? (
        <div className="card-meta">
          <small>Today at 12.28 AM</small>
          <small className="category">food</small>
        </div>
      ) : (
        <div className="card-meta">
          <small>200 hours</small>
        </div>
      )}
    </div>
  );
}
