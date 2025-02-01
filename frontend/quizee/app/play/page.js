"use client";
import Leaderboard from "@/components/leaderboard";
import QuestionDisplay from "@/components/questionsDisplay";
import { useState, useEffect } from "react";
import { useAuth } from "@/firebase";

const PlayQuiz = () => {
  const [quizCode, setQuizCode] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!isLive) return;
  
    function beforeUnload(e) {
      e.preventDefault();
      e.returnValue = "You are currently in a quiz session. Are you sure you want to leave?";
    }
  
    function handleBackButton(event) {
      event.preventDefault();
      alert("You are currently in a quiz session. Please complete the quiz before leaving.");
      window.history.pushState(null, "", window.location.href);
    }

    window.addEventListener("beforeunload", beforeUnload);
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [isLive]);

  const handleJoinQuiz = async () => {
    if (!quizCode.trim()) {
      alert("Quiz code cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/quiz/verify/${quizCode}/`);
      if (!res.ok) {
        alert("Invalid Quiz Code");
        setLoading(false);
        setQuizCode("");
        return;
      }

      setIsLive(true);

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
      };

      leaderboardSocket.onerror = (err) => {
        console.error("WebSocket Error:", err);
      };

      leaderboardSocket.onclose = () => {
        console.log("WebSocket Closed");
      };
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {!isLive ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Join a Quiz</h1>
          <p className="text-gray-600 mb-6">
            Enter the quiz code provided by the host to join the quiz.
          </p>
          <input
            type="text"
            placeholder="Enter Quiz Code"
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            value={quizCode}
            onChange={(e) => setQuizCode(e.target.value)}
          />
          <button
            className={`w-full text-white py-2 rounded-md transition ${
              quizCode.trim()
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleJoinQuiz}
            disabled={!quizCode.trim() || loading}
          >
            {loading ? "Joining..." : "Join Quiz"}
          </button>
        </div>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
          <QuestionDisplay quizCode={quizCode} />
          <Leaderboard quizCode={quizCode} />
        </div>
      )}
    </div>
  );
};

export default PlayQuiz;
