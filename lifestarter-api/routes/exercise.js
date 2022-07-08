const express = require("express");
const Exercise = require("../models/exercise");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const exercises = await Exercise.getExercise();
    res.status(200).json({ exercises: exercises });
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const exercises = req.body;


    const data = await Exercise.postExercise(exercises);

    res.status(201).json({ exercise: data });
  } catch (err) {
    next(err)
  }
});

module.exports = router;
