// routes/exam.js

const express = require("express");
const router = express.Router();             // <-- THIS was missing
const verifyToken = require("../middleware/auth"); // adjust path if your auth middleware is elsewhere
const Student = require("../models/student");     // import Student model
const Result = require("../models/result");       // import Result model

// Submit exam route
router.post("/submit", verifyToken, async (req, res) => {
  const { answers, score } = req.body;

  const student = await Student.findById(req.studentId);

  if (student.hasSubmitted) {
    return res.status(400).json({ message: "Exam already submitted" });
  }

  try {
    const result = new Result({
      studentId: req.studentId,
      answers,
      score
    });

    await result.save();

    student.hasSubmitted = true;
    await student.save();

    res.json({ message: "Exam submitted" });
  } catch {
    res.status(500).json({ message: "Error submitting exam" });
  }
});

// Export router
module.exports = router;
