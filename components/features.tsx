import { motion } from "framer-motion";
import { Brain, Trophy, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Learn",
    description: "Test your coding knowledge with diverse questions"
  },
  {
    icon: Trophy,
    title: "Compete",
    description: "Challenge friends and compare scores globally"
  },
  {
    icon: Sparkles,
    title: "Improve",
    description: "Track progress and master new concepts"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Features() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          variants={item}
          className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-colors"
        >
          <feature.icon className="w-8 h-8 mb-3 mx-auto text-blue-500" />
          <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}