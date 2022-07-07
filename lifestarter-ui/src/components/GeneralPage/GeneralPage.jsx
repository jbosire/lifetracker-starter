import * as React from "react";
import GeneralCard from "../GeneralCard/GeneralCard"
import "./GeneralPage.css";
import { useState, useEffect } from "react";

export default function GeneralPage(props) {
  return (
    <div className="GeneralPage">
      <div className="Banner">
        <h1>{props.pageType}</h1>
      </div>
      <div className="content">
        <div className="GeneralPageOverview">
          <div className="header">
            <h3>Overview</h3>
            <button className="Button outline small outline aqua">
              {" "}
              Record {props.pageType}
            </button>
          </div>
          <div className="feed">
            <GeneralCard />
            <GeneralCard />
            <GeneralCard />
            <GeneralCard />
            <GeneralCard />

            
            {/* <div className="empty">
              <h2>Nothing here yet.</h2>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
