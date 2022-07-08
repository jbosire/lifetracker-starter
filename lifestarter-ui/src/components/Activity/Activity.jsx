import * as React from "react";
import "./Activity.css";

export default function Activity() {
  return (
    <div className="Activity">
      <div className="Banner">
        <h1>Activity</h1>
      </div>
      <div className="content">
        <div className="ActivityOverview">
          <div className="header">
            <h3>Overview</h3>
            <button className="Button outline small outline aqua">
              {" "}
              Add Activity
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