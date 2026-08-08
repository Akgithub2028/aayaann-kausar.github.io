"use client";

import React, { ElementType } from "react";
import { useReducedMotion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  as?: ElementType;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Component = "span", className = "" }) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={`relative inline-block ${className} group`}>
      <span className="relative z-10">{text}</span>
      <span 
        aria-hidden="true" 
        className="absolute inset-0 z-0 text-[var(--accent-primary)] -translate-x-[2px] opacity-0 group-hover:opacity-100 mix-blend-screen"
        style={{ animation: "glitch-anim-1 8s infinite linear alternate-reverse" }}
      >
        {text}
      </span>
      <span 
        aria-hidden="true" 
        className="absolute inset-0 z-0 text-[var(--accent-secondary)] translate-x-[2px] opacity-0 group-hover:opacity-100 mix-blend-screen"
        style={{ animation: "glitch-anim-2 8s infinite linear alternate-reverse" }}
      >
        {text}
      </span>
    </Component>
  );
};
