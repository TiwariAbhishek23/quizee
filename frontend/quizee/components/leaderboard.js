"use client";
import { useState, useEffect } from "react";

const Leaderboard = ({ quizCode }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/${quizCode}/leaderboard`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received leaderboard data:", data);
      if (data.data) {
        setLeaderboard(Object.values(data.data));
      }
    };

    return () => ws.close();
  }, [quizCode]);

  return (
    <div className="flex flex-col items-center justify-center">
  <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg border p-8">
    <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">🏆 Live Leaderboard</h2>

    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <table className="w-full text-lg text-gray-700">
        <thead className="bg-blue-500 text-white uppercase text-left">
          <tr>
            <th className="py-4 px-6">Rank</th>
            <th className="py-4 px-6">Name</th>
            <th className="py-4 px-6 text-right">Score</th>
            <th className="py-4 px-6 text-right">Join Time</th>
            <th className="py-4 px-6 text-right">Attempted</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {leaderboard.length > 0 ? (
            leaderboard.map((player, index) => (
              <tr
                key={index}
                className={`text-lg ${
                  index === 0 ? "bg-yellow-300 font-bold text-gray-900" :
                  index === 1 ? "bg-gray-200" :
                  index === 2 ? "bg-orange-200" : "bg-white"
                }`}
              >
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{player.name}</td>
                <td className="py-4 px-6 text-right font-medium">{player.score}</td>
                <td className="py-4 px-6 text-right text-sm text-gray-600">{player.join_time}</td>
                <td className="py-4 px-6 text-right">{player.attempted}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-6 text-center text-gray-500 text-lg">No players yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
};

export default Leaderboard;
