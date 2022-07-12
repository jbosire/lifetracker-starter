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



router.post("/create", async (req, res, next) => {
  try {
    const nutritions = req.body;


    const data = await Nutrition.postNutrition(nutritions);

    res.status(201).json({ nutrition: data });
  } catch (err) {
    next(err)
  }
});

router.get("/:user_id", async (req, res, next) => {
  const user_id = Number(req.params.user_id);
  

  const nutritions = await Nutrition.getNutritionById(user_id)
  

  res.status(200).json({ nutrition: nutritions });
});

module.exports = router;
