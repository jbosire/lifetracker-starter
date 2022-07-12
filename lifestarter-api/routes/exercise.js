const express = require("express");
const Exercise = require("../models/exercise");
const security = require("../middleware/security")
const router = express.Router();

router.get("/",security.requireAuthenticatedUser ,async (req, res, next) => {
  try {
    const {user} = res.locals
    const exercises = await Exercise.listExerciseForUser(user)
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
    next(err);
  }
});

router.get("/:user_id", async (req, res, next) => {
  const user_id = Number(req.params.user_id);
  

  const exercises = await Exercise.getExercisesById(user_id);
  

  res.status(200).json({ exercise: exercises });
});

module.exports = router;
