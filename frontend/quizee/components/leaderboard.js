"use client";
import { useState, useEffect } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/leaderboard");
        const data = await res.json();
        if (res.ok) {
          setLeaderboard(data.leaderboard);
        } else {
          console.error("Error fetching leaderboard:", data);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border">
      <h2 className="text-3xl font-bold text-center text-gray-800">🏆 Leaderboard</h2>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="text-left text-lg text-gray-700 border-b">
            <th className="py-2 px-3">Rank</th>
            <th className="py-2 px-3">Name</th>
            <th className="py-2 px-3 text-right">Score</th>
            <th className="py-2 px-3 text-right">Join Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr
              key={index}
              className={`text-lg border-b ${
                index === 0 ? "bg-yellow-100 font-semibold" : 
                index === 1 ? "bg-gray-200" : 
                index === 2 ? "bg-orange-200" : "bg-white"
              }`}
            >
              <td className="py-3 px-3">{index + 1}</td>
              <td className="py-3 px-3">{player.name}</td>
              <td className="py-3 px-3 text-right">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
