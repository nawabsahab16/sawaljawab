import { Question } from './types';

const API_URL = 'https://opentdb.com/api.php';

export async function fetchQuestions(amount: number): Promise<Question[]> {
  const response = await fetch(
    `${API_URL}?amount=${amount}&category=18&type=multiple&difficulty=medium`
  );
  const data = await response.json();
  
  return data.results.map((q: any, index: number) => ({
    id: index + 1,
    question: q.question,
    options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
    correctAnswer: q.correct_answer
  }));
}


export const fallbackQuestions: Question[] = [
  {
    id: 1,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: "O(log n)"
  },
];

export async function getQuestions(count: number): Promise<Question[]> {
  try {
    return await fetchQuestions(count);
  } catch (error) {
    console.error('Failed to fetch questions, using fallback:', error);
    return fallbackQuestions.slice(0, count);
  }
}