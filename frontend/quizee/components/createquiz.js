"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const CreateQuiz = () => {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizCode, setQuizCode] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleCreateQuiz = async () => {
    if (!topic.trim() || numQuestions < 1 || numQuestions > 10) {
      alert("Please enter a valid topic and select 1-10 questions.");
      return;
    }

    try {
        
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Form Section */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Create a New Quiz
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter quiz topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          placeholder="Number of questions (max 10)"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          min="1"
          max="10"
          className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleCreateQuiz}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition"
        >
          Generate Quiz
        </button>
      </div>

      {/* Quiz Code Section */}
      {quizCode && (
        <motion.div
          className="mt-6 p-4 bg-gray-100 text-center rounded-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-gray-700 font-medium">Quiz Code:</p>
          <p className="text-lg font-bold text-indigo-600">{quizCode}</p>
        </motion.div>
      )}

      {/* Questions Section */}
      {questions.length > 0 && (
        <motion.div
          className="mt-6 p-4 bg-gray-50 rounded-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Generated Questions:
          </h3>
          <ul className="mt-2 space-y-2">
            {questions.map((q, index) => (
              <li key={index} className="p-3 bg-white shadow rounded-md">
                {index + 1}. {q}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default CreateQuiz;
