const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Prevent multiple submissions
  hasSubmitted: { type: Boolean, default: false },

  // Cheating detection
  events: {
    fullscreenExit: { type: Number, default: 0 },
    doubleTaps: { type: Number, default: 0 },
    tabSwitch: { type: Number, default: 0 }
  },

  // Time tracking
  timeSpent: { type: Number, default: 0 }
});

module.exports = mongoose.model("Student", StudentSchema);
