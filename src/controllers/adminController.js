const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

// @desc Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, description } = req.body;

    const quiz = await Quiz.create({
      title,
      description,
      createdBy: req.user.id,
    });

     res.status(201).json({ message: 'Quiz created', quiz });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error });
  }
};

// @desc Add question to a quiz
// exports.addQuestion = async (req, res) => {
//   try {
//     const { quizId } = req.params;
//     const { questionText, options, correctAnswerIndex } = req.body;

//     const question = await Question.create({
//       quiz: quizId,
//       questionText,
//       options,
//       correctAnswerIndex,
//     });

//     const quiz = await Quiz.findByIdAndUpdate(
//       quizId,
//       { $push: { questions: question._id } },
//       { new: true }
//     );

//     res.status(201).json({ quiz, question });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding question", error });
//   }
// };
exports.addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questionText, options, correctAnswerIndex } = req.body;

    console.log('Received data:', { quizId, questionText, options, correctAnswerIndex });

    if (!questionText || !Array.isArray(options) || options.length !== 4) {
      return res.status(400).json({ message: 'Invalid question input' });
    }

    const question = await Question.create({
      quiz: quizId,
      questionText,
      options,
      correctAnswerIndex,
    });

    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { $push: { questions: question._id } },
      { new: true }
    );

    res.status(201).json({ quiz, question });
  } catch (error) {
    console.error('Error in addQuestion:', error);
    res.status(500).json({ message: "Error adding question", error: error.message });
  }
};


// @desc Delete a quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    await Question.deleteMany({ quiz: quizId });
    await Quiz.findByIdAndDelete(quizId);

    res.status(200).json({ message: "Quiz and its questions deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
};
