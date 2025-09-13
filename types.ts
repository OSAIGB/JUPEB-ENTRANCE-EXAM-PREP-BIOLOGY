
export interface Question {
  id: number;
  subject: string;
  question: string;
  options: { [key: string]: string };
  correctAnswer: string; // The key of the correct option, e.g., 'A'
}

export type GameState = 'start' | 'playing' | 'finished';
