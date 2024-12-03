"use client";

import { motion } from "framer-motion";
import { Button } from "./button";
import { Card } from "./card";
import { Trophy, Share2, RefreshCcw } from "lucide-react";
import type { QuizResult } from "@/lib/types";

interface ResultProps {
  result: QuizResult;
  onRestart: () => void;
}

export function Result({ result, onRestart }: ResultProps) {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const shareText = `🎯 I scored ${result.score}/${result.totalQuestions} (${percentage}%) in the SawalJawab programming quiz! Can you beat my score? Try now at`;

  const shareScore = (platform: "whatsapp" | "twitter" | "linkedin") => {
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(shareText)}`
    };
    window.open(urls[platform], "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="p-6 backdrop-blur-sm bg-background/95">
        <div className="text-center space-y-6">
          <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
          
          <div>
            <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-4xl font-bold text-primary mb-2">
              {percentage}%
            </p>
            <p className="text-muted-foreground">
              You scored {result.score} out of {result.totalQuestions}
            </p>
            <p className="text-sm text-muted-foreground">
              Time taken: {result.timeSpent} seconds
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-medium">Share your achievement!</p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareScore("whatsapp")}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <i className="fab fa-whatsapp text-lg" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareScore("twitter")}
                className="bg-blue-400 hover:bg-blue-500 text-white"
              >
                <i className="fab fa-twitter text-lg" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => shareScore("linkedin")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <i className="fab fa-linkedin-in text-lg" />
              </Button>
            </div>
          </div>

          <Button
            onClick={onRestart}
            className="w-full"
            variant="outline"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}