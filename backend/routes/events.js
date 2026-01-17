const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const jwt = require("jsonwebtoken");

// Verify token (reuse your code)
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.studentId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Failed to authenticate token" });
  }
};

// FULLSCREEN EXIT
router.post("/fullscreen", verifyToken, async (req, res) => {
  const student = await Student.findById(req.studentId);
  student.events.fullscreenExit += 1;
  await student.save();
  res.json({ message: "Fullscreen exit recorded" });
});

// DOUBLE TAP
router.post("/doubletap", verifyToken, async (req, res) => {
  const student = await Student.findById(req.studentId);
  student.events.doubleTaps += 1;
  await student.save();
  res.json({ message: "Double tap recorded" });
});

// TAB SWITCH
router.post("/tabswitch", verifyToken, async (req, res) => {
  const student = await Student.findById(req.studentId);
  student.events.tabSwitch += 1;
  await student.save();
  res.json({ message: "Tab switch recorded" });
});

// TIME TRACK
router.post("/time", verifyToken, async (req, res) => {
  const { time } = req.body;
  const student = await Student.findById(req.studentId);
  student.timeSpent += time;
  await student.save();
  res.json({ message: "Time updated" });
});

module.exports = router;
