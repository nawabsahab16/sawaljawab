"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { Card } from "./card";
import { Progress } from "./progress";
import { Timer, AlertCircle } from "lucide-react";
import type { Question } from "@/lib/types";

interface QuizProps {
  questions: Question[];
  timeLimit: number;
  onComplete: (score: number, timeSpent: number) => void;
}

export function Quiz({ questions, timeLimit, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else {
      onComplete(score, timeLimit - timeLeft);
    }
  }, [timeLeft, score, timeLimit, onComplete]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(c => c + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        onComplete(score + (answer === questions[currentQuestion].correctAnswer ? 1 : 0), timeLimit - timeLeft);
      }
    }, 1500);
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) return "";
    if (option === questions[currentQuestion].correctAnswer) return "bg-green-500 hover:bg-green-600";
    if (option === selectedAnswer) return "bg-red-500 hover:bg-red-600";
    return "opacity-50";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="p-6 backdrop-blur-sm bg-background/95">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              Question {currentQuestion + 1}/{questions.length}
            </span>
            <div className="flex items-center gap-2 text-sm">
              <Timer className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          </div>

          <Progress value={(currentQuestion / questions.length) * 100} />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold" dangerouslySetInnerHTML={{ 
              __html: questions[currentQuestion].question 
            }} />

            <div className="grid gap-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`w-full text-left justify-start ${getButtonClass(option)}`}
                  variant="outline"
                  dangerouslySetInnerHTML={{ __html: option }}
                />
              ))}
            </div>
          </div>

          {timeLeft < 10 && (
            <div className="flex items-center gap-2 text-amber-500">
              <AlertCircle className="w-4 h-4" />
              <span>Time is running out!</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}