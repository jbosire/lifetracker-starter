const express = require("express");
const Sleep = require("../models/sleep");
const router = express.Router();
const User = require("../models/user")
const security = require("../middleware/security")



router.get("/",security.requireAuthenticatedUser ,async (req, res, next) => {
  try {
    var {user} = res.locals
    
    
    const sleeps = await Sleep.listSleepForUser(user)
    res.status(200).json({ sleeps: sleeps });
  } catch (err) {
    next(err);
  }
});



router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {user} = res.locals
   
    
    const sleeps = req.body; 
    const sleep = await Sleep.postSleep({sleeps,user});
    return res.status(200).json({ sleep: sleep });
  } catch (err) {
    next(err);
  }
});



module.exports = router;
