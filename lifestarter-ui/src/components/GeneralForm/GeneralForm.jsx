import * as React from "react";
import "./GeneralForm.css";

export default function GeneralForm(props) {
  if (props.formType === "Sleep") {
    return (
      <div className="GeneralForm">
        <div className="GeneralNew">
          <h2>Log Sleep</h2>
          <div className="form">
            <div className="InputField">
              <label for="startTime">Start Time</label>
              <input
                type="datetime-local"
                name="startTime"
              />
            </div>
            <div className="InputField">
              <label for="endTime">End Time</label>
              <input
                type="datetime-local"
                name="endTime"
              />
            </div>
            <button className="Button primary large sleep">Save</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="GeneralForm">
      <div className="GeneralNew">
        <h2>{"Record " + props.formType}</h2>
        <div className="form">
          <div className="InputField">
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder={props.formType + " name"}
            />
          </div>
          <div className="InputField">
            <label for="category">Category</label>
            <input
              type="text"
              name="category"
              placeholder={props.formType + " category"}
            />
          </div>

          {props.formType === "Nutrition" ? (
            <div className="split-input-field">
              <div className="InputField">
                <label for="quantity">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="100000000"
                  placeholder="1"
                />
              </div>
              <div className="InputField">
                <label for="calories">Calories</label>
                <input
                  type="number"
                  name="calories"
                  min="0"
                  max="100000000"
                  step="10"
                  placeholder="0"
                />
              </div>
            </div>
          ) : (
            <div className="split-input-field">
              <div className="InputField">
                <label for="duration">Duration(minutes)</label>
                <input
                  type="number"
                  name="duration"
                  min="1"
                  max="100000000"
                  placeholder="1"
                />
              </div>
              <div className="InputField">
                <label for="intensity">Intensity(1-10)</label>
                <input
                  type="number"
                  name="intensity"
                  min="1"
                  max="10"
                  step="1"
                  placeholder="1"
                />
              </div>
            </div>
          )}

          {props.formType === "Nutrition" ? (
            <div className="InputField">
              <label for="imageUrl">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                placeholder="http://www.image.com"
              />
            </div>
          ) : null}

          <button className="Button primary large aqua">Save</button>
        </div>
      </div>
    </div>
  );
}
