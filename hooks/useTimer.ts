import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialTimeInSeconds: number, onTimeout: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);
  // Fix: Changed NodeJS.Timeout to number for browser compatibility.
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Stop the timer if it has reached zero
    if (timeLeft <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      onTimeout();
      return;
    }

    // Set up the interval
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval on component unmount or when timeLeft changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    minutes,
    seconds,
  };
};
