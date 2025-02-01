import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/firebase";

const QuestionDisplay = ({ quizCode }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const questionSocket = new WebSocket(
      `ws://localhost:8000/ws/${quizCode}/question`
    );

    questionSocket.onmessage = (event) => {
      try {
        const newQuestion = JSON.parse(event.data);
        if (newQuestion?.question && newQuestion?.options?.length) {
          setQuestions((prev) => [...prev, newQuestion]);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    return () => {
      questionSocket.close();
    };
  }, [quizCode, user]);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    const isCorrect =
      selectedAnswer === questions[currentQuestionIndex].correct;

    const leaderboardSocket = new WebSocket(
      `ws://localhost:8000/ws/${quizCode}/leaderboard`
    );
    leaderboardSocket.onopen = () => {
      leaderboardSocket.send(
        JSON.stringify({
          uid: user.uid,
          name: user.name || user.email.split("@")[0],
          correct: isCorrect,
        })
      );
      leaderboardSocket.close();
    };

    setSelectedAnswer(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="p-6 bg-gray-100 flex flex-col items-center m-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Quiz</h2>

      {/* Display Questions */}
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {currentQuestionIndex + 1}.{" "}
            {questions[currentQuestionIndex].question}
          </h3>

          <ul className="mt-4 space-y-2">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li
                key={index}
                className={`p-3 rounded-md cursor-pointer ${
                  selectedAnswer === option ? "bg-blue-200" : "bg-gray-100"
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>

          {/* Next Button */}
          {selectedAnswer && (
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleNext}
            >
              Next Question
            </button>
          )}
        </motion.div>
      ) : (
        <p className="text-gray-600">Waiting for questions...</p>
      )}
    </div>
  );
};

export default QuestionDisplay;
