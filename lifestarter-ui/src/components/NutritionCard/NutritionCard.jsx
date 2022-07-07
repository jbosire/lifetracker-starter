import * as React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import "./NutritionCard.css";
//import { SocialIcon } from "react-social-icons";

export default function NutritionCard(props) {
  return (
    <div className="NutritionCard">
        <div className="card-header">
            <img src="https://www.momontimeout.com/wp-content/uploads/2020/10/easy-chicken-piccata-recipe-square.jpg" alt="nutrition"/>
            <h2 className="tile">Joram Bosire</h2>
        </div>
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

        <div className="card-meta">
            <small>Today at 12.28 AM</small>
            <small className="category">food</small>
        </div>

    </div>

  )
}