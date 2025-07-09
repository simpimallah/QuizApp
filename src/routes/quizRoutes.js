const express = require("express");
const router = express.Router();

const {
  getAllQuizzes,
  submitQuiz,
  getUserResults,
  getQuizById ,
  getQuizResultById
} = require("../controllers/quizController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAllQuizzes); // Get all quizzes
router.get('/:quizId', protect, getQuizById);
router.post("/submit", protect, submitQuiz);         // Submit answers
router.get("/results", protect, getUserResults);     // Get user's past results
router.get('/result/:quizId', protect, getQuizResultById);

module.exports = router;
