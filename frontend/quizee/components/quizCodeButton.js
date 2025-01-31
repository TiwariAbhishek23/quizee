import React from "react";
import { motion } from "framer-motion";

export default function QuizCodeButton({ quizCode}) {
  return (
    <motion.button
      className="mt-6 p-4 bg-gray-100 text-center rounded-md w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => {
        navigator.clipboard.writeText(quizCode);
        alert("Quiz code copied to clipboard!");
      }}
    >
      <p className="text-gray-700 font-medium">Quiz Code:</p>
      <p className="text-lg font-bold text-indigo-600">{quizCode}</p>
    </motion.button>
  );
}
