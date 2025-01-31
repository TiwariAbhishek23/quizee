import React from "react";
import { motion } from "framer-motion";

const GeneratedQuestion = ({ question }) => {
  return (
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
          <div key={index} className="space-y-2">
            <li className="p-3 bg-white shadow rounded-md flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span>
                  {index + 1}. {q[0]}
                </span>
              </div>
              <ul className="mt-2 space-y-2">
                {q[1].map((option, i) => (
                  <li key={i} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      id={`question-${index}-${i}`}
                      value={option}
                      className="mr-2"
                    />
                    <label htmlFor={`question-${index}-${i}`}>{option}</label>
                  </li>
                ))}
              </ul>
              <div>Correct Answer: {q[2]}</div>
              <div>Points: 5</div>
            </li>
            {/* Delete Button */}
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpload(index)}
                className="bg-lime-500 text-white px-2 py-1 rounded-md hover:bg-lime-700"
              >
                Upload
              </button>
              <button
                onClick={() => handleEdit(index)}
                className="bg-orange-400 text-white px-3 py-1 rounded-md hover:bg-orange-700"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </ul>
    </motion.div>
  );
};

export default GeneratedQuestion;
