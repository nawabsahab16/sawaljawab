"use client";

import { motion } from "framer-motion";

export function Logo({ className = "w-20 h-20", animate = true }: { className?: string; animate?: boolean }) {
  const icon = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="text-blue-600" style={{ stopColor: "currentColor" }} />
          <stop offset="100%" className="text-purple-600" style={{ stopColor: "currentColor" }} />
        </linearGradient>
      </defs>
      <path
        d="M50 10L90 30V70L50 90L10 70V30L50 10Z"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M35 40L45 50L35 60M65 40L55 50L65 60"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return animate ? (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
  ) : (
    icon
  );
}