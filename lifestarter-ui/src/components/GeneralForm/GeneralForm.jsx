import * as React from "react";
import { Link } from "react-router-dom";
import "./GeneralForm.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function GeneralForm(props) {

  const nutritionForm = {
    nutrient: "",
    category: "",
    quantity: 0,
    calories: 0,
    imageUrl: "",
    user_id: 13,
  };

  const sleepForm = {
    startTime: "",
    endTime: "",
    user_id: 13,
  };

  const exerciseForm = {
    exercise: "",
    category: "",
    duration: 0,
    intensity: 0,
    user_id: 13,
  };

  const [success,setSuccess] = useState(false)
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(
    props.formType != "Nutrition" && props.formType != "Sleep"
      ? exerciseForm
      : props.formType === "Nutrition"
      ? nutritionForm
      : sleepForm
  );

 

  const handleOnInputChange = (event) => {
    if(event.target.name === "startTime"){
      if (event.target.value.length === 0) {
        setErrors((e) => ({
          ...e,
          startTime: "Please enter sleep start time" ,
        }));
      } else {
        setErrors((e) => ({ ...e, startTime: null }));
      }

    }

    if(event.target.name === "endTime"){
      if (event.target.value.length === 0) {
        setErrors((e) => ({
          ...e,
          endTime: "Please enter sleep end time",
        }));
      } else {
        setErrors((e) => ({ ...e, endTime: null }));
      }

    }


    if (
      event.target.name === "nutrient" ||
      event.target.name === "exercise"
    ) {
      if (event.target.value.length === 0) {
        setErrors((e) => ({
          ...e,
          name: "Please enter activity's " + event.target.name + " name",
        }));
      } else {
        setErrors((e) => ({ ...e, name: null }));
      }
    }

    if(event.target.name === "imageUrl"){
      if (event.target.value.length === 0) {
        setErrors((e) => ({
          ...e,
          imageUrl : "Please enter activity's " + event.target.name,
        }));
      } else {
        setErrors((e) => ({ ...e, imageUrl: null }));
      }

    }

    if(event.target.name === "category"){
      if (event.target.value.length === 0) {
        setErrors((e) => ({
          ...e,
          category : "Please enter activity's " + event.target.name,
        }));
      } else {
        setErrors((e) => ({ ...e, category: null }));
      }

    }

    if (
      event.target.name === "quantity" ||
      event.target.name === "calories" ||
      event.target.name === "duration" ||
      event.target.name === "intensity"
    ) {
      if (event.target.value < 1) {
        setErrors((e) => ({
          ...e,
          number: "Please enter valid " + event.target.name + " values.",
        }));
      } else {
        setErrors((e) => ({ ...e, number: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    
  };
 


  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));


    try {
      const res = await axios.post("http://localhost:3001/"  + props.formType.toLowerCase() + "/create", form);

      if (res?.data) {
       
        setSuccess(true);
        setTimeout(function(){setSuccess(false)}, 3000)
        setIsLoading(false);
      } else {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with activity submission",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };

  
  

  if (props.formType === "Sleep") {
    return (
      <div className="GeneralForm">
        <div className="GeneralNew">
          <div className="bannerTop">
          
            <h2>Submit Sleep</h2>
            {errors.form && (
                <span className="error">{errors.form}</span>
              )}
            <Link to="/sleep">
              <button className="back"> Back </button>
            </Link>
          </div>
          <div className="form">
            <div className="InputField">
              <label for="startTime">Start Time</label>
              <input type="datetime-local" name="startTime" onChange={handleOnInputChange}/>
              {errors.startTime && (
                <span className="error">{errors.startTime}</span>
              )}
            </div>
            <div className="InputField">
              <label for="endTime">End Time</label>
              <input type="datetime-local" name="endTime" onChange={handleOnInputChange}/>
              {errors.endTime && (
                <span className="error">{errors.endTime}</span>
              )}
            </div>
            {success ? <span className="success">Your sleep has been recorded successfully!!</span> : null}
          <button className="Button primary large aqua" onClick={handleOnSubmit}>{isLoading ? "Saving..." : "Save"}</button>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="GeneralForm">
      <div className="GeneralNew">
        <div className="bannerTop">
          <h2>{"Record " + props.formType}</h2>
          {errors.form && (
                <span className="error">{errors.form}</span>
              )}
          <Link to={"/" + props.formType.toLowerCase()}>
            <button className="back"> Back </button>
          </Link>
        </div>
        <div className="form">
          <div className="InputField">
            <label
              for={props.formType === "Nutrition" ? "nutrient" : "exercise"}
            >
              Name
            </label>
            <input
              type="text"
              name={props.formType === "Nutrition" ? "nutrient" : "exercise"}
              placeholder={props.formType + " name"}
              onChange={handleOnInputChange}
            />
            {errors.name && (
                <span className="error">{errors.name}</span>
              )}
          </div>
          <div className="InputField">
            <label for="category">Category</label>
            <input
              type="text"
              name="category"
              placeholder={props.formType + " category"}
              onChange={handleOnInputChange}
            />
             {errors.category && (
                <span className="error">{errors.category}</span>
              )}
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
                  onChange={handleOnInputChange}
                />
                {errors.number && (
                <span className="error">{errors.number}</span>
              )}
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
                  onChange={handleOnInputChange}
                />
                {errors.number && (
                <span className="error">{errors.number}</span>
              )}
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
                  onChange={handleOnInputChange}
                />
                {errors.number && (
                <span className="error">{errors.number}</span>
              )}
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
                  onChange={handleOnInputChange}
                />
                {errors.number && (
                <span className="error">{errors.number}</span>
              )}
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
                onChange={handleOnInputChange}
              />
              {errors.imageUrl && (
                <span className="error">{errors.imageUrl}</span>
              )}
            </div>
          ) : null}
           {success ? <span className="success">Your activity has been recorded successfully!!</span> : null}
          <button className="Button primary large aqua" onClick={handleOnSubmit}>{isLoading ? "Saving..." : "Save"}</button>
        </div>
      </div>
    </div>
  );
}
