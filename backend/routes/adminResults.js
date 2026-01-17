const express = require("express");
const router = express.Router();
const Result = require("../models/result");
const Student = require("../models/student");

// Admin get results table
router.get("/results", async (req, res) => {
  try {
    const results = await Result.find().populate("studentId", "name roll cheatingEvents");
    res.json({ results });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
