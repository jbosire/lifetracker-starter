import * as React from "react";
import "./GeneralCard.css";

export default function GeneralCard(props) {


    if(props.cardType === "Sleep"){
      var date = new Date(props.item.createdat)
      const month = date.toLocaleString('default', { month: 'long' }); 
      var day = date.getDay();
      var year = date.getFullYear()
      var createdDate = month + " " + day + ", " + year

      
      var start = new Date(props.item.starttime)
      var end = new Date(props.item.endtime)
      var diffHours = Math.floor((end-start) / 3600000) + " hours"


      var started = start.toLocaleTimeString().slice(0,4) + start.toLocaleTimeString().slice(7,10)
      var ended = end.toLocaleTimeString().slice(0,4) + end.toLocaleTimeString().slice(7,10)


    }

    if(props.cardType === "Nutrition" || props.cardType === "Exercise"){
      var date = new Date()
      const month = date.toLocaleString('default', { month: 'long' }); 
      var day = date.getDay();
      var year = date.getFullYear()
      var createdDate = month + " " + day + ", " + year
      var dated = date.toLocaleTimeString().slice(0,4) + date.toLocaleTimeString().slice(7,10)
      var finalDate = createdDate + " " +  dated

     

    }
  
  return (
    <div className={"GeneralCard " + props.cardType}>
      <div className="card-header">
        {props.cardType === "Nutrition" ? (
          <img src={props.item.imageurl} alt="nutrition" />
        ) : null}
        <h2 className="tile">
          {props.cardType != "Nutrition" && props.cardType != "Sleep"
            ? props.item.exercise
            : props.cardType === "Nutrition"
            ? props.item.nutrient
            : createdDate}
        </h2>
      </div>
      {props.cardType === "Nutrition" ? (
        <div className="card-stats">
          <div className="CardStat">
            <p>Calories</p>
            <span>{props.item.calories}</span>
          </div>
          <div className="CardStat">
            <p>Quantity</p>
            <span>{props.item.quantity}</span>
          </div>
        </div>
      ) : null}

      {props.cardType === "Sleep" ? (
        <div className="card-stats">
          <div className="CardStat">
            <p>Start Time</p>
            <span>{started}</span>
          </div>
          <div className="CardStat">
            <p>End Time</p>
            <span>{ended}</span>
          </div>
        </div>
      ) : null}

      {props.cardType === "Exercise" ? (
        <div className="card-stats">
          <div className="CardStat">
            <p>Duration</p>
            <span>{props.item.duration}</span>
          </div>
          <div className="CardStat">
            <p>Intensity</p>
            <span>{props.item.intensity}</span>
          </div>
        </div>
      ) : null}

      {props.cardType != "Sleep" ? (
        <div className="card-meta">
          <small>{finalDate}</small>
          <small className="category">{props.item.category}</small>
        </div>
      ) : (
        <div className="card-meta">
          <small>{diffHours}</small>
        </div>
      )}
    </div>
  );
}
