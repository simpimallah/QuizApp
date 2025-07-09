const express = require("express");
const router = express.Router();

const {
  createQuiz,
  addQuestion,
  deleteQuiz,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

router.post("/quiz", protect, isAdmin, createQuiz);              // Create quiz
router.post("/quiz/:quizId/question", protect, isAdmin, addQuestion); // Add question to quiz
router.delete("/quiz/:quizId", protect, isAdmin, deleteQuiz);    // Delete quiz

module.exports = router;
