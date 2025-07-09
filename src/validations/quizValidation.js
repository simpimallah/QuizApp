const Joi = require("joi");

exports.createQuizValidation = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().optional(),
});

exports.createQuestionValidation = Joi.object({
  questionText: Joi.string().min(5).required(),
  options: Joi.array().items(Joi.string()).length(4).required(),
  correctAnswerIndex: Joi.number().min(0).max(3).required(),
});
