import React, { useState, useCallback, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { quizQuestions } from './constants/quizQuestions';
import type { GameState, SavedProgress } from './types';

const QUIZ_PROGRESS_KEY = 'jupebQuizProgress';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState<number>(0);
  const [savedProgress, setSavedProgress] = useState<SavedProgress | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(QUIZ_PROGRESS_KEY);
    if (savedData) {
      setSavedProgress(JSON.parse(savedData));
    }
  }, []);

  const startQuiz = useCallback(() => {
    localStorage.removeItem(QUIZ_PROGRESS_KEY);
    setSavedProgress(null);
    setScore(0);
    setGameState('playing');
  }, []);

  const continueQuiz = useCallback(() => {
    if (savedProgress) {
      setScore(savedProgress.score);
      setGameState('playing');
    }
  }, [savedProgress]);

  const finishQuiz = useCallback((finalScore: number) => {
    localStorage.removeItem(QUIZ_PROGRESS_KEY);
    setSavedProgress(null);
    setScore(finalScore);
    setGameState('finished');
  }, []);
  
  const saveAndExit = useCallback(() => {
    const savedData = localStorage.getItem(QUIZ_PROGRESS_KEY);
    if (savedData) {
        setSavedProgress(JSON.parse(savedData));
    }
    setGameState('start');
  }, []);

  const restartQuiz = useCallback(() => {
    setGameState('start');
  }, []);

  const renderGameState = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onStart={startQuiz} onContinue={continueQuiz} hasSavedProgress={!!savedProgress} />;
      case 'playing':
        return <Quiz questions={quizQuestions} onQuizEnd={finishQuiz} onSaveAndExit={saveAndExit} initialState={savedProgress} />;
      case 'finished':
        return <Results score={score} totalQuestions={quizQuestions.length} onRestart={restartQuiz} />;
      default:
        return <StartScreen onStart={startQuiz} onContinue={continueQuiz} hasSavedProgress={!!savedProgress} />;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      {renderGameState()}
    </div>
  );
};

export default App;