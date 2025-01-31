"use client";
import { useState } from "react";

export default function JoinQuiz() {
  const [quizCode, setQuizCode] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  const joinQuiz = async () => {
    try {
      const ws = new WebSocket(`ws://localhost:8000/ws/${quizCode}`);
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        alert(data.message);
        if (data.type === "leaderboard") {
          setLeaderboard(data.leaderboard);
        }
      };

      setMessage(data.message);
      fetchLeaderboard(); // Update leaderboard after joining
    } catch (error) {
      setMessage(error.message);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("");
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to fetch leaderboard");

      setLeaderboard(data.leaderboard);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Join a Quiz</h2>
      
      <input
        type="text"
        placeholder="Enter Quiz Code"
        value={quizCode}
        onChange={(e) => setQuizCode(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />
      
      <input
        type="text"
        placeholder="Enter Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />
      
      <button
        onClick={joinQuiz}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        Join Quiz
      </button>

      {message && <p className="mt-3 text-center text-red-600">{message}</p>}

      <h3 className="text-lg font-semibold mt-6">Leaderboard</h3>
      <ul className="mt-2">
        {leaderboard.map((user, index) => (
          <li key={index} className="p-2 border-b">
            <span className="font-bold">{index + 1}. {user.username}</span> - Score: {user.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
