import React from "react";
import Link from "next/link";

const Hero = () => {
    return (
      <div className="h-screen flex">
        {/* Left Section - Create Quiz */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-10">
          <h1 className="text-4xl font-bold mb-4">Create a Quiz</h1>
          <p className="text-lg mb-6">Host engaging quizzes and challenge players!</p>
          <Link className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
            href="/create"
          >
            Create Quiz
          </Link>
        </div>
  
        {/* Right Section - Play Quiz */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-600 text-white p-10">
          <h1 className="text-4xl font-bold mb-4">Join a Quiz</h1>
          <p className="text-lg mb-6">Play quizzes, compete, and test your knowledge!</p>
          <Link className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
            href="/play"
          >
            Play Quiz
          </Link>
        </div>
      </div>
    );
  };
  
  export default Hero;
