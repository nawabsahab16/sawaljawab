"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuizConfig } from "@/components/ui/quiz-config";
import { Quiz } from "@/components/ui/quiz";
import { Result } from "@/components/ui/result";
import { getQuestions } from "@/lib/questions";
import { Trophy, Sparkles } from "lucide-react";
import type { QuizResult, Question } from "@/lib/types";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Logo } from "@/components/icons/logo";

enum GameState {
  START,
  CONFIG,
  QUIZ,
  RESULT
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLimit, setTimeLimit] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStart = () => setGameState(GameState.CONFIG);
  
  const handleQuizStart = async (questionCount: number) => {
    setLoading(true);
    try {
      const fetchedQuestions = await getQuestions(questionCount);
      setQuestions(fetchedQuestions);
      setTimeLimit(questionCount * 6);
      setGameState(GameState.QUIZ);
    } catch (error) {
      console.error('Failed to start quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = (score: number, timeSpent: number) => {
    setResult({ score, totalQuestions: questions.length, timeSpent });
    setGameState(GameState.RESULT);
  };

  const handleRestart = () => {
    setGameState(GameState.START);
    setQuestions([]);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          {gameState === GameState.START && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600/50 to-purple-600/50 blur-xl" />
                <div className="relative bg-background/95 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-primary/10">
                  <Logo />

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl font-black mb-4"
                  >
                    <span className="text-blue-600">Sawal</span>
                    <span className="text-purple-600">Jawab</span>
                  </motion.h1>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-muted-foreground mb-8"
                  >
                    Play, Learn, and Share with friends. Test and expand knowledge!
                  </motion.p>

                  <Features />
                  <HowItWorks />

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      onClick={handleStart}
                      size="lg"
                      className="relative group px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <span className="relative flex items-center gap-2">
                        Start Quiz
                        <Logo className="w-5 h-5" animate={false} />
                      </span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {gameState === GameState.CONFIG && (
            <QuizConfig onStart={handleQuizStart} loading={loading} />
          )}

          {gameState === GameState.QUIZ && (
            <Quiz
              questions={questions}
              timeLimit={timeLimit}
              onComplete={handleQuizComplete}
            />
          )}

          {gameState === GameState.RESULT && result && (
            <Result result={result} onRestart={handleRestart} />
          )}
        </div>
      </div>
    </main>
  );
}