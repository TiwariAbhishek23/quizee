import { useState} from "react";

export default function Quiz() {
  const [quizCode, setQuizCode] = useState("");
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState(null);
  const [timer, setTimer] = useState(30);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  const joinQuiz = async () => {
    try {
      const res = await fetch("http://localhost:8000/join-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz_code: quizCode, username }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to join quiz");
      setMessage(data.message);
      fetchNextQuestion();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const fetchNextQuestion = async () => {
    try {
      const res = await fetch(`http://localhost:8000/get-question/${quizCode}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to get question");

      setQuestion(data);
      setTimer(data.time_limit || 30);  // Use the time limit from the question data
      startTimer();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const startTimer = () => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          handleSubmitAnswer();  // Auto-submit after time elapses
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmitAnswer = async () => {
    try {
      const res = await fetch(`http://localhost:8000/submit-answer/${quizCode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, answer }),
      });
      const data = await res.json();
      setMessage(`Correct answer: ${data.correct_answer}`);
      fetchLeaderboard();  // Update leaderboard after answering
    } catch (error) {
      setMessage(error.message);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`http://localhost:8000/leaderboard/${quizCode}`);
      const data = await res.json();
      setLeaderboard(data.leaderboard);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Join the Quiz</h2>

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

      {question && (
        <div className="mt-6">
          <p>{question.question_index}. {question.question}</p>
          <div className="mt-3">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={option}
                  name="answer"
                  value={option}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
          <p>Time remaining: {timer} seconds</p>
          <button
            onClick={handleSubmitAnswer}
            className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-700"
          >
            Submit Answer
          </button>
        </div>
      )}

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
