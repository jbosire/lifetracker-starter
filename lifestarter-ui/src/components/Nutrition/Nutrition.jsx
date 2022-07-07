import * as React from "react";
import Navbar from "../Navbar/Navbar";
import NutritionCard from "../NutritionCard/NutritionCard";
import "./Nutrition.css";
import { useState, useEffect } from "react";

export default function Nutrition() {
  return (
    <div className="Nutrition">
      <div className="Banner">
        <h1>Nutrition</h1>
      </div>
      <div className="content">
        <div className="NutritionOverview">
          <div className="header">
            <h3>Overview</h3>
            <button className="Button outline small outline aqua">
              {" "}
              Record Nutrition
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
