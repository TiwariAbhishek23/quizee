import { motion } from "framer-motion";
export default function QuizQuestions(uploadedQuestions) {
  return (
    <motion.div
      className="mt-6 p-4 bg-gray-50 rounded-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold text-gray-800">
        Uploaded Questions:
      </h3>
      <ul className="mt-2 space-y-2">
        {uploadedQuestions.map((q, index) => (
          <li key={index} className="p-3 bg-white shadow rounded-md">
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
            <div>Points: 5</div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
