"use client";
import React from "react";

interface MarqueeProps {
  text: string;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  textColor?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ 
  text, 
  speed = 30, 
  direction = "left",
  className = "",
  textColor = "var(--text-dim)"
}) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap py-2 border-y border-white/5 bg-transparent flex w-full relative ${className}`}>
      <div 
        className={`flex ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="font-space-grotesk text-[10px] font-bold uppercase tracking-[0.2em] px-12 opacity-40" style={{ color: textColor }}>
            {text} <span className="text-[var(--text-dim)] mx-6 opacity-30">·</span>
          </span>
        ))}
      </div>
      
      {/* Decorative Overlays for fade effect at edges */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-void)] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-void)] to-transparent z-10 pointer-events-none" />
    </div>
  );
};
