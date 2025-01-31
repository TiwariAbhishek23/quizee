import React from "react";

const QuizTopicForm = ({topic, numQuestions, handleCreateQuiz}) => {
  return (
    <>
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
    </>
  );
};
export default QuizTopicForm;
