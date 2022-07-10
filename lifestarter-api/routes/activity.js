const express = require("express");
const Activity = require("../models/activity");
const router = express.Router();

router.get("/sleep", async (req, res, next) => {
  try {
    const sleeptotals = await Activity.getSleepAvg();
    res.status(200).json({ sleephours: sleeptotals });
  } catch (err) {
    next(err);
  }
});

router.get("/exercise", async (req, res, next) => {
  try {
    const exercisetotals = await Activity.getTotalExercise();
    res.status(200).json({ exercisetotals: exercisetotals });
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const exercises = req.body;


  //  const data = await Exercise.postExercise(exercises);

 //   res.status(201).json({ exercise: data });
  } catch (err) {
    next(err)
  }
});

module.exports = router;
