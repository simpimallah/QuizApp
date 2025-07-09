const calculateScore = (questions, userAnswers) => {
  let score = 0;
  const results = [];

  questions.forEach((question, index) => {
    const selectedIndex = userAnswers[index];
    const isCorrect = question.correctAnswerIndex === selectedIndex;

    if (isCorrect) score++;

    results.push({
      question: question._id,
      selectedOptionIndex: selectedIndex,
      isCorrect,
    });
  });

  return { score, results };
};

module.exports = calculateScore;
