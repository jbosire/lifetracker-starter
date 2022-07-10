const express = require("express");
const Sleep = require("../models/sleep");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const sleeps = await Sleep.getSleep();
    res.status(200).json({ sleeps: sleeps });
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const sleeps = req.body;


    const data = await Sleep.postSleep(sleeps);

    res.status(201).json({ sleep: data });
  } catch (err) {
    next(err)
  }
});

router.get("/:user_id", async (req, res, next) => {
  const user_id = Number(req.params.user_id);
  

  const sleeps = await Sleep.getSleepById(user_id)
  

  res.status(200).json({ sleep: sleeps });
});

module.exports = router;
