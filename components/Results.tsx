
import React from 'react';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const getFeedback = () => {
    if (percentage >= 80) return { message: "Excellent!", color: "text-green-400" };
    if (percentage >= 60) return { message: "Good Job!", color: "text-cyan-400" };
    if (percentage >= 40) return { message: "You can do better!", color: "text-yellow-400" };
    return { message: "Keep Practicing!", color: "text-red-400" };
  };

  const feedback = getFeedback();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 p-4">
      <div className="bg-slate-800 p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl border border-slate-700 text-center transform transition-all duration-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Quiz Completed!</h2>
        <p className={`text-3xl sm:text-4xl md:text-5xl font-bold my-6 ${feedback.color}`}>{feedback.message}</p>
        <div className="text-base sm:text-lg md:text-xl text-slate-300 space-y-3">
          <p>Your Score: <span className="font-bold text-white">{score}</span> out of <span className="font-bold text-white">{totalQuestions}</span></p>
          <p>Percentage: <span className="font-bold text-white">{percentage}%</span></p>
        </div>
        <button
          onClick={onRestart}
          className="mt-10 bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-lg text-base sm:text-lg hover:bg-cyan-400 transition-colors duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Results;
