const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Result = require("../models/Result");

// @desc    Get all quizzes (admin/user)
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .select("title createdAt")
      .populate({
        path: "questions",
        select: "questionText options",
      });

    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
};
// @route   GET /api/quiz/:quizId
// ✅ Get quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate({
      path: 'questions',
      select: 'questionText options',
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error fetching quiz by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Submit quiz answers
// exports.submitQuiz = async (req, res) => {
//   try {
//     const { quizId, answers } = req.body;

//     const quiz = await Quiz.findById(quizId).populate("questions");
//     if (!quiz) return res.status(404).json({ message: "Quiz not found" });

//     let score = 0;
//     const resultAnswers = [];

//     quiz.questions.forEach((question, index) => {
//       const selected = answers[index];
//       const isCorrect = question.correctAnswerIndex === selected;

//       if (isCorrect) score++;

//       resultAnswers.push({
//         question: question._id,
//         selectedOptionIndex: selected,
//         isCorrect,
//       });
//     });

//     const result = await Result.create({
//       user: req.user.id,
//       quiz: quiz._id,
//       score,
//       answers: resultAnswers,
//     });

//     res.status(200).json({
//       message: "Quiz submitted successfully",
//       score,
//       total: quiz.questions.length,
//       result,
//     });
//   } catch (error) {
//     console.error("Submit quiz error:", error);
//     res.status(500).json({ message: "Error submitting quiz", error });
//   }
// };
// POST /api/quiz/submit
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const userId = req.user._id;

    const quiz = await Quiz.findById(quizId).populate('questions');

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;
    const evaluatedAnswers = quiz.questions.map((question, index) => {
      const correctIndex = question.correctOptionIndex;
      const selected = answers[index];
      const isCorrect = selected === correctIndex;
      if (isCorrect) score++;

      return {
        question: question._id,
        selectedOptionIndex: selected,
        isCorrect,
      };
    });

    const result = new Result({
      user: userId,
      quiz: quizId,
      score,
      answers: evaluatedAnswers,
    });

    await result.save();

    res.json({
      message: "Quiz submitted successfully",
      score,
      total: quiz.questions.length,
      result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get results for the current user
exports.getUserResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id })
      .populate("quiz", "title")
      .populate("answers.question", "questionText options correctAnswerIndex");

    res.status(200).json(results);
  } catch (error) {
    console.error("Fetch results error:", error);
    res.status(500).json({ message: "Error fetching results", error });
  }
};


// @desc    Get result for specific quiz for the logged-in user
// @route   GET /api/quiz/result/:quizId
// @access  Private
exports.getQuizResultById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { quizId } = req.params;

    const result = await Result.findOne({ user: userId, quiz: quizId })
      .populate('quiz')
      .populate({
        path: 'answers.question',
        select: 'text options correctOptionIndex',
      });

    if (!result) {
      return res.status(404).json({ message: "Result not found for this quiz." });
    }

    const enrichedAnswers = result.answers.map((ans) => ({
      questionText: ans.question.text,
      selectedOptionText: ans.question.options[ans.selectedOptionIndex],
      isCorrect: ans.isCorrect,
    }));

    res.json({
      quizId: result.quiz,
      score: result.score,
      answers: enrichedAnswers,
      createdAt: result.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



