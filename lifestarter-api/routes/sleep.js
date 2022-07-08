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
  } catch (err) {}
});

module.exports = router;
