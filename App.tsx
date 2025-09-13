
import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { quizQuestions } from './constants/quizQuestions';
import type { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState<number>(0);

  const startQuiz = useCallback(() => {
    setScore(0);
    setGameState('playing');
  }, []);

  const finishQuiz = useCallback((finalScore: number) => {
    setScore(finalScore);
    setGameState('finished');
  }, []);

  const restartQuiz = useCallback(() => {
    setGameState('start');
  }, []);

  const renderGameState = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onStart={startQuiz} />;
      case 'playing':
        return <Quiz questions={quizQuestions} onQuizEnd={finishQuiz} />;
      case 'finished':
        return <Results score={score} totalQuestions={quizQuestions.length} onRestart={restartQuiz} />;
      default:
        return <StartScreen onStart={startQuiz} />;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      {renderGameState()}
    </div>
  );
};

export default App;
