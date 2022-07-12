const express = require("express");
const Nutrition = require("../models/nutrition");
const router = express.Router();
const User = require("../models/user")
const security = require("../middleware/security")



router.get("/",security.requireAuthenticatedUser ,async (req, res, next) => {
  try {
    var {user} = res.locals
    
    
    const nutritions = await Nutrition.listNutritionForUser(user)
    res.status(200).json({ nutritions: nutritions });
  } catch (err) {
    next(err);
  }
});



router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {user} = res.locals
    
    
    const nutritions = req.body; 
    const nutrition = await Nutrition.postNutrition({nutritions,user});
    return res.status(200).json({ nutrition: nutrition });
  } catch (err) {
    next(err);
  }
});



module.exports = router;
