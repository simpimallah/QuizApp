const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    options: {
      type: [String], // Array of strings
      required: true,
      validate: [arr => arr.length === 4, 'Exactly 4 options required'],
    },
    correctAnswerIndex: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
