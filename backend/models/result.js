const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  answers: { type: Array },
  score: { type: Number },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Result", ResultSchema);
