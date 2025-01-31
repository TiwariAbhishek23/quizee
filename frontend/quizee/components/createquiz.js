"use client";

import React, { useState, useEffect } from "react";
import { generateQuizCode } from "../utils/quizCode";
import QuizQuestions from "./quizCard";
import QuizCodeButton from "./quizCodeButton";
import GeneratedQuestion from "./generatedQuestion";
import QuizTopicForm from "./quizForm";

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
    const [q, options, correct] = updatedQuestions[index];
    const ws = new WebSocket(`ws://localhost:8000/ws/${quizCode}/question`);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          question: q,
          options: options,
          correct: correct,
        })
      );
    };

  };

  const wsCheckForUpdate = () => {
    const ws = new WebSocket(`ws://localhost:8000/ws/${quizCode}/question`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      alert(data.message);
      alert(data);

      const { question, options, correctAnswer } = data;

      setUploadedQuestions((prev) => [
        ...prev,
        [question, options, correctAnswer],
      ]);
    };
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
    try {
      const response = await fetch("http://localhost:8000/upload-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions: questions,
        }),
      });
      console.log(response);
      alert("Questions uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
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
      !correctAnswer.trim()
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
      const response = await fetch(
        `http://localhost:8000/generate-quiz?topic=${topic}&num_questions=${numQuestions}`
      );
      const data = await response.json();
      setQuestions(data);
      setQuizCode(generateQuizCode());
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Form Section */}
      {!questions.length && <QuizTopicForm topic={topic} numQuestions={numQuestions} handleCreateQuiz={handleCreateQuiz} />}
      {/* Quiz Code Section */}
      {quizCode && <QuizCodeButton quizCode={quizCode} />}

      {/* Questions Section */}
      {questions.length > 0 && <GeneratedQuestion questions={questions} />}
      {quizCode && (
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
      {uploadedQuestions.length > 0 && <QuizQuestions uploadedQuestions={uploadedQuestions} />}
    </div>
  );
};

export default CreateQuiz;
