import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";

const QUESTIONS = [
  {
    q: "What does \"diversification\" mean in investing?",
    options: [
      "Putting all your money into one stock you trust",
      "Spreading your money across different stocks so one bad one can't sink you",
      "Buying and selling the same stock repeatedly in a day",
      "Only investing in companies you've worked for",
    ],
    correct: 1,
  },
  {
    q: "What is a \"stop-loss\" order?",
    options: [
      "An order that buys more of a stock automatically",
      "A rule that stops you from logging in after a loss",
      "An instruction to sell automatically if the price falls to a level you set",
      "A government limit on how much you can invest",
    ],
    correct: 2,
  },
  {
    q: "A stock you just bought drops 8% the next day. What's usually the wiser response?",
    options: [
      "Sell immediately to avoid further loss, no matter what",
      "Review why you bought it and whether anything has actually changed, rather than reacting to the price alone",
      "Buy a lot more immediately",
      "Delete the app",
    ],
    correct: 1,
  },
  {
    q: "In a portfolio, what does \"P&L\" stand for?",
    options: ["Price & Liquidity", "Profit & Loss", "Portfolio & Ledger", "Payment & Limit"],
    correct: 1,
  },
  {
    q: "Why can investing in a stock just because it's \"trending\" be risky?",
    options: [
      "Trending stocks are always scams",
      "It's not risky at all — trends are reliable",
      "A price trending up doesn't tell you anything about whether the company is actually sound, and trends can reverse fast",
      "Trending stocks are illegal to buy",
    ],
    correct: 2,
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState([]);

  const loadAttempts = () => {
    api.get("/api/quiz/attempts").then((res) => setAttempts(res.data));
  };

  useEffect(loadAttempts, []);

  const selectAnswer = (qIndex, optionIndex) => {
    if (submitted) return;
    const next = [...answers];
    next[qIndex] = optionIndex;
    setAnswers(next);
  };

  const handleSubmit = async () => {
    if (answers.some((a) => a === null)) {
      toast.error("Answer every question first.");
      return;
    }
    const correctCount = answers.filter((a, i) => a === QUESTIONS[i].correct).length;
    setScore(correctCount);
    setSubmitted(true);
    try {
      await api.post("/api/quiz/attempts", { score: correctCount, totalQuestions: QUESTIONS.length });
      loadAttempts();
    } catch (err) {
      toast.error("Could not save this attempt.");
    }
  };

  const handleRetake = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSubmitted(false);
  };

  const first = attempts[0];
  const latest = attempts[attempts.length - 1];

  return (
    <>
      <h3 className="title">Investing Basics Quiz</h3>

      <div style={{ padding: "0 24px 16px" }}>
        <p style={{ fontSize: "13px", color: "#6E6E73" }}>
          Five quick questions. Retake it any time — your attempts are saved so you (or anyone
          studying how Vestora is used) can see whether your score improves.
        </p>

        {attempts.length > 0 && (
          <div style={{ display: "flex", gap: "24px", margin: "12px 0 20px" }}>
            <div>
              <p style={{ margin: 0, fontSize: "12px", color: "#6E6E73" }}>First attempt</p>
              <p style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
                {first.score}/{first.totalQuestions}
              </p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "12px", color: "#6E6E73" }}>Latest attempt</p>
              <p style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#0071E3" }}>
                {latest.score}/{latest.totalQuestions}
              </p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "12px", color: "#6E6E73" }}>Attempts taken</p>
              <p style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>{attempts.length}</p>
            </div>
          </div>
        )}

        {QUESTIONS.map((item, qIndex) => (
          <div key={qIndex} style={{ marginBottom: "18px" }}>
            <p style={{ fontSize: "14.5px", fontWeight: 600, marginBottom: "8px" }}>
              {qIndex + 1}. {item.q}
            </p>
            {item.options.map((opt, oIndex) => {
              const isSelected = answers[qIndex] === oIndex;
              const isCorrect = oIndex === item.correct;
              let bg = "#F5F5F7";
              if (submitted && isSelected && isCorrect) bg = "#E8F9EE";
              else if (submitted && isSelected && !isCorrect) bg = "#FFEDEC";
              else if (submitted && isCorrect) bg = "#E8F9EE";
              else if (isSelected) bg = "#E5F1FF";

              return (
                <div
                  key={oIndex}
                  onClick={() => selectAnswer(qIndex, oIndex)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: bg,
                    marginBottom: "6px",
                    fontSize: "13.5px",
                    cursor: submitted ? "default" : "pointer",
                    border: "1px solid #E5E5EA",
                  }}
                >
                  {opt}
                </div>
              );
            })}
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            style={{ padding: "10px 20px", borderRadius: "8px", background: "#0071E3", color: "#fff", border: "none" }}
          >
            Submit answers
          </button>
        ) : (
          <>
            <p style={{ fontSize: "16px", fontWeight: 600, margin: "12px 0" }}>
              You scored {score} / {QUESTIONS.length}
            </p>
            <button
              onClick={handleRetake}
              style={{ padding: "10px 20px", borderRadius: "8px", background: "#F5F5F7", border: "1px solid #D2D2D7" }}
            >
              Retake quiz
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
