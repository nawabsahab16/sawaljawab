export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizConfig {
  numberOfQuestions: number;
  timeLimit: number;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
}