
const express = require("express");
const Activity = require("../models/activity");
const security = require("../middleware/security")
const User = require("../models/user")
const router = express.Router();


router.get("/",security.requireAuthenticatedUser ,async (req, res, next) => {
  try {
    var {user} = res.locals


  //  console.log(user)
    
    const stats = await Activity.getStats({user})
    res.status(200).json({ stats: stats });
  } catch (err) {
    next(err);
  }
});


router.get("/sleep",security.requireAuthenticatedUser ,async (req, res, next) => {
  try {
    var {user} = res.locals


  //  console.log(user)
    
    const stats = await Activity.getTotalSleep({user})
    res.status(200).json({ stats: stats });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
