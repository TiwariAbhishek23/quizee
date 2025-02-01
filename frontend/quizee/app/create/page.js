"use client";

import React, { useState } from "react";
import { generateQuizCode } from "@/utils/quizCode";
import { motion } from "framer-motion";
import Leaderboard from "@/components/leaderboard";

const CreateQuiz = () => {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizCode, setQuizCode] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [addQuestionBool, setAddQuestionBool] = useState(false);
  const [uploadedQuestions, setUploadedQuestions] = useState([]);

  const handleUpload = (index) => {
    const updatedQuestions = [...questions];
    const [question, options, answer] = updatedQuestions[index];
    const ws = new WebSocket(`ws://localhost:8000/ws/${quizCode}/question`);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          question,
          options,
          answer,
        })
      );
    };
    // remove uploaded question from list
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleEdit = (index) => {
    const updatedQuestions = [...questions];
    const [q, options, correct] = updatedQuestions[index];
    setQuestion(q);
    setOption1(options[0]);
    setOption2(options[1]);
    setOption3(options[2]);
    setOption4(options[3]);
    setCorrectAnswer(correct);
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    setAddQuestionBool(true);
  };

  const uploadQuestions = async () => {

  };

  const handleDelete = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const addQuestionForm = () => {
    return (
      <div className="space-y-4 m-4 bg-lime-200 border-s-violet-500 p-3 rounded-md justify-center text-center items-center">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 border bg-red-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Option 1"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Option 2"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Option 3"
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
          className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Option 4"
          value={option4}
          onChange={(e) => setOption4(e.target.value)}
          className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full p-3 border bg-green-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={addQuestion}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition"
        >
          Add Question
        </button>
        <button
          className="w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-600 transition"
          onClick={() => {
            setAddQuestionBool(!addQuestionBool);
          }}
        >
          Cancel Question
        </button>
      </div>
    );
  };

  const addQuestion = () => {
    if (
      !question.trim() ||
      !option1.trim() ||
      !option2.trim() ||
      !option3.trim() ||
      !option4.trim() ||
      !correctAnswer.trim() ||
      ![option1, option2, option3, option4].includes(correctAnswer)
    ) {
      alert("Please enter a valid question and options.");
      return;
    }
    const newQuestions = [...questions];
    newQuestions.push([
      question,
      [option1, option2, option3, option4],
      correctAnswer,
    ]);
    setQuestions(newQuestions);
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectAnswer("");
    setAddQuestionBool(false);
  };
  const handleCreateQuiz = async () => {
    if (!topic.trim() || numQuestions < 1 || numQuestions > 10) {
      alert("Please enter a valid topic and select 1-10 questions.");
      return;
    }

    try {
      const quiz_code = generateQuizCode();
      setQuizCode(quiz_code);
      const response = await fetch(
        `http://localhost:8000/quiz/${quiz_code}/generate-questions/?topic=${topic}&num_questions=${numQuestions}`
      );
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      alert(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Form Section */}
      {!questions.length && (
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
      )}
      {/* Quiz Code Section */}
      {quizCode && (
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
      )}
      {quizCode &&  (
        <>
          <button
            className="m-4 bg-slate-200 border-s-violet-500 p-3 rounded-md justify-center text-center items-center"
            onClick={() => {
              setAddQuestionBool(!addQuestionBool);
            }}
          >
            Add Questions
          </button>
         {questions.length>0 && ( <button
            className="m-4 bg-lime-300 border-s-violet-500 p-3 rounded-md justify-center text-center items-center"
            onClick={() => {
              uploadQuestions();
            }}
          >
            Upload Questions
          </button>
          )}
        </>
      )}
      {addQuestionBool && addQuestionForm()}
      {uploadedQuestions.length > 0 && (
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
      )}
      {quizCode && (
      <Leaderboard quizCode={quizCode} />
    )}
    </div>

    </>
  );
};

export default CreateQuiz;
