import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  onContinue: () => void;
  hasSavedProgress: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onContinue, hasSavedProgress }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-center p-4">
      <div className="bg-slate-800 p-6 sm:p-10 rounded-2xl shadow-2xl border border-slate-700">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400 mb-4">
          JUPEB ENTRANCE EXAM PREP QUIZ
        </h1>
        <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-lg">
          Test your knowledge with 40 questions covering English, Physics, Chemistry, and Biology. You have <span className="font-bold text-white">30 minutes</span> to complete the quiz. Good luck!
        </p>
        {hasSavedProgress ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={onContinue}
              className="bg-cyan-500 text-slate-900 font-bold py-3 px-10 rounded-lg text-lg sm:text-xl hover:bg-cyan-400 transition-colors duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
            >
              Continue Quiz
            </button>
            <button
              onClick={onStart}
              className="bg-slate-700 text-slate-200 font-bold py-3 px-10 rounded-lg text-lg sm:text-xl hover:bg-slate-600 transition-colors duration-300"
            >
              Start New Quiz
            </button>
          </div>
        ) : (
          <button
            onClick={onStart}
            className="bg-cyan-500 text-slate-900 font-bold py-3 px-10 rounded-lg text-lg sm:text-xl hover:bg-cyan-400 transition-colors duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
          >
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default StartScreen;