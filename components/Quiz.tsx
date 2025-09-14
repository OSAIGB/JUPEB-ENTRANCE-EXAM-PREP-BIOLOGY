import React, { useState, useEffect } from 'react';
import type { Question, SavedProgress } from '../types';
import { useTimer } from '../hooks/useTimer';

interface QuizProps {
  questions: Question[];
  onQuizEnd: (finalScore: number) => void;
  onSaveAndExit: () => void;
  initialState: SavedProgress | null;
}

const Quiz: React.FC<QuizProps> = ({ questions, onQuizEnd, onSaveAndExit, initialState }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialState?.currentQuestionIndex ?? 0);
  const [score, setScore] = useState(initialState?.score ?? 0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleTimeout = () => {
    onQuizEnd(score);
  };
  
  const { minutes, seconds, timeLeft } = useTimer(initialState?.timeLeft ?? 30 * 60, handleTimeout);
  
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
          setCurrentQuestionIndex(nextQuestionIndex);
          setSelectedAnswer(null);
          setIsAnswered(false);
        } else {
          onQuizEnd(score);
        }
      }, 2000); // 2-second delay to show the correct answer
      return () => clearTimeout(timer);
    }
  }, [isAnswered, currentQuestionIndex, questions.length, score, onQuizEnd]);

  const handleAnswerClick = (optionKey: string) => {
    if (isAnswered) return;

    setSelectedAnswer(optionKey);
    setIsAnswered(true);

    if (optionKey === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleSaveAndExit = () => {
    const progress: SavedProgress = {
      currentQuestionIndex,
      score,
      timeLeft,
    };
    localStorage.setItem('jupebQuizProgress', JSON.stringify(progress));
    onSaveAndExit();
  };

  const getButtonClass = (optionKey: string) => {
    if (!isAnswered) {
      return 'bg-slate-700 hover:bg-cyan-600';
    }
    if (optionKey === currentQuestion.correctAnswer) {
      return 'bg-green-600 border-green-500';
    }
    if (optionKey === selectedAnswer) {
      return 'bg-red-600 border-red-500';
    }
    return 'bg-slate-600 opacity-50';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-4 font-sans">
      <div className="w-full max-w-4xl bg-slate-800 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-slate-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-semibold bg-cyan-800 text-cyan-200 px-3 py-1 rounded-full">
            {currentQuestion.subject}
          </div>
           <div className="flex items-center gap-2">
            <button onClick={handleSaveAndExit} className="text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-3 rounded-lg transition-colors">
              Save & Exit
            </button>
            <div className="text-base md:text-lg font-bold bg-slate-700 px-3 py-2 rounded-lg">
              <span className="hidden sm:inline">Time Left: </span>
              <span className="text-cyan-400 tabular-nums">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-3 md:h-4 mb-6">
          <div
            className="bg-cyan-500 h-3 md:h-4 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
         <p className="text-center text-slate-400 mb-6 text-base md:text-lg">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        
        {/* Question */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100 leading-tight">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleAnswerClick(key)}
              disabled={isAnswered}
              className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-lg text-left text-base md:text-lg font-medium transition-colors duration-300 border-2 border-transparent ${getButtonClass(key)}`}
            >
              <div>
                <span className="font-bold mr-3">{key}.</span>
                {value}
              </div>
               {isAnswered && key === currentQuestion.correctAnswer && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {isAnswered && key === selectedAnswer && key !== currentQuestion.correctAnswer && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;