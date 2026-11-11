const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { QuizAttemptModel } = require("../model/QuizAttemptModel");

const router = express.Router();
router.use(authMiddleware);

// GET /api/quiz/attempts — every past attempt, oldest first, so the first
// one is the "before" score and the latest is the "after" score.
router.get("/attempts", async (req, res) => {
  const attempts = await QuizAttemptModel.find({ userId: req.user.id }).sort({ createdAt: 1 });
  res.json(attempts);
});

// POST /api/quiz/attempts — record a completed attempt.
router.post("/attempts", async (req, res) => {
  try {
    const score = Number(req.body.score);
    const totalQuestions = Number(req.body.totalQuestions);

    if (Number.isNaN(score) || Number.isNaN(totalQuestions) || totalQuestions <= 0) {
      return res.status(400).json({ message: "Invalid quiz score." });
    }

    const attempt = await new QuizAttemptModel({
      userId: req.user.id,
      score,
      totalQuestions,
    }).save();

    res.status(201).json(attempt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not save your quiz attempt." });
  }
});

module.exports = router;
