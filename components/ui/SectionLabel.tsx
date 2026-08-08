"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionLabelProps {
  text: string;
  index?: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ text, className = "" }) => {
  const prefersReduced = useReducedMotion();
  const chars = text.split("");

  return (
    <div className={`flex items-center space-x-4 mb-8 ${className}`}>
      <div className="flex items-center text-[var(--accent-primary)] font-jetbrains uppercase tracking-widest text-sm sm:text-base font-medium overflow-hidden">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: prefersReduced ? 0 : "100%", opacity: prefersReduced ? 0 : 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.05,
              ease: [0.33, 1, 0.68, 1], // Custom cubic bezier
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 h-[1px] bg-[var(--accent-primary)] opacity-20 relative origin-left"
      >
        {/* Glowing right line */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] to-transparent opacity-50 blur-[1px]"></div>
      </motion.div>
    </div>
  );
};
