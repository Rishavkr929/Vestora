const { model } = require("mongoose");
const { QuizAttemptSchema } = require("../schemas/QuizAttemptSchema");

const QuizAttemptModel = model("quizAttempt", QuizAttemptSchema);

module.exports = { QuizAttemptModel };
