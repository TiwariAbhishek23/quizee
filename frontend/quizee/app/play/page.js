"use client";
import Leaderboard from "@/components/leaderboard";
import QuestionDisplay from "@/components/questionsDisplay";
import { useState } from "react";
import { useAuth } from "@/firebase";

const PlayQuiz = () => {
  const [name, setName] = useState("");
  const [quizCode, setQuizCode] = useState("");
  const [isLive, setIsLive] = useState(false);
  const { user } = useAuth();
  
  const handleJoinQuiz = () => {
    if (name && quizCode) {
      setIsLive(true);
    }
    const leaderboardSocket = new WebSocket(
      `ws://localhost:8000/ws/${quizCode}/leaderboard`
    );
    leaderboardSocket.onopen = () => {
      leaderboardSocket.send(
        JSON.stringify({
          uid: user.uid,
          name: user.name || user.email.split("@")[0],
          correct: false,
        })
      );
      leaderboardSocket.close();
    };
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {!isLive ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Join a Quiz</h1>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="w-full p-3 border border-gray-300 rounded-md mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Quiz Code"
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            value={quizCode}
            onChange={(e) => setQuizCode(e.target.value)}
          />
          <button
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            onClick={handleJoinQuiz}
          >
            Join Quiz
          </button>
        </div>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
          <QuestionDisplay quizCode={quizCode} />
          <Leaderboard quizCode={quizCode}/>
        </div>
      )}
    </div>
  );
};

export default PlayQuiz;