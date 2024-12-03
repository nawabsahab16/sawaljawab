"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { Slider } from "./slider";
import { Card } from "./card";
import { Timer, Loader2 } from "lucide-react";

interface QuizConfigProps {
  onStart: (questionCount: number) => void;
  loading?: boolean;
}

export function QuizConfig({ onStart, loading }: QuizConfigProps) {
  const [questionCount, setQuestionCount] = useState(10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="p-6 backdrop-blur-sm bg-background/95">
        <h2 className="text-2xl font-bold mb-6 text-center">Configure Your Quiz</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Questions</label>
            <Slider
              value={[questionCount]}
              onValueChange={(value) => setQuestionCount(value[0])}
              min={5}
              max={50}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>5</span>
              <span>{questionCount} questions</span>
              <span>50</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Timer className="w-4 h-4" />
            <span>Time limit: {questionCount * 6} seconds</span>
          </div>

          <Button
            onClick={() => onStart(questionCount)}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading Questions...
              </>
            ) : (
              "Start Quiz"
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}