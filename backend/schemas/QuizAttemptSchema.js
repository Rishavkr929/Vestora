const { Schema } = require("mongoose");

// One row per time a user takes the investing-basics quiz. Keeping every
// attempt (not just the latest) is what lets us show a before/after
// improvement — exactly what a small user study needs as evidence.
const QuizAttemptSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = { QuizAttemptSchema };
