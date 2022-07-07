import * as React from "react";
import "./Exercise.css";
import { useState, useEffect } from "react";

export default function Exercise() {
  return (
    <div className="Exercise">
      <div className="Banner">
        <h1>Exercise</h1>
      </div>
      <div className="content">
        <div className="ExerciseOverview">
          <div className="header">
            <h3>Overview</h3>
            <button className="Button outline small outline aqua">
              {" "}
              Add exercise
            </button>
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