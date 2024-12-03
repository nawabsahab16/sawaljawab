import { motion } from "framer-motion";
import { Settings, Clock, Share2 } from "lucide-react";

const steps = [
  {
    icon: Settings,
    title: "Configure",
    description: "Choose number of questions"
  },
  {
    icon: Clock,
    title: "Take Quiz",
    description: "Answer within time limit"
  },
  {
    icon: Share2,
    title: "Share Results",
    description: "Challenge friends on social media"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export function HowItWorks() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            variants={item}
            className="flex items-center gap-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/10"
          >
            <step.icon className="w-6 h-6 text-blue-500 shrink-0" />
            <div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden md:block text-2xl text-muted-foreground">→</div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}