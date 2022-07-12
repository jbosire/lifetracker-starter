const express = require("express");
const Exercise = require("../models/exercise");
const security = require("../middleware/security")
const User = require("../models/user")
const router = express.Router();

router.get("/",security.requireAuthenticatedUser ,async (req, res, next) => {
  try {
    var {user} = res.locals
    
    const exercises = await Exercise.listExerciseForUser(user)
    res.status(200).json({ exercises: exercises });
  } catch (err) {
    next(err);
  }
});

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {user} = res.locals
    
    const exercises = req.body; 
    const exercise = await Exercise.postExercise({exercises,user});
    return res.status(200).json({ exercise: exercise });
  } catch (err) {
    next(err);
  }
});





module.exports = router;
