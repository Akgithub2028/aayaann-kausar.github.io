"use client";
import React from "react";

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hover?: boolean;
}

export const NeonCard: React.FC<NeonCardProps> = ({
  children,
  className = "",
  glowColor = "var(--accent-primary)",
  hover = true,
}) => {
  return (
    <div
      className={`relative bg-[var(--bg-surface)] rounded-sm border border-white/10 
        transition-all duration-300 ${hover ? "hover:-translate-y-0.5" : ""} ${className}`}
      style={hover ? {
        "--card-glow": glowColor,
      } as React.CSSProperties : undefined}
      onMouseEnter={hover ? (e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = `0 0 24px ${glowColor}33, 0 0 1px ${glowColor}`;
        el.style.borderColor = `${glowColor}66`;
      } : undefined}
      onMouseLeave={hover ? (e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "";
        el.style.borderColor = "";
      } : undefined}
    >
      {/* Single corner accent — top-left only, subtle */}
      <div
        className="absolute top-0 left-0 w-4 h-4 pointer-events-none"
        style={{
          borderTop: `1px solid ${glowColor}80`,
          borderLeft: `1px solid ${glowColor}80`,
          borderRadius: '0 0 0 var(--radius-sm)'
        }}
      />
      {children}
    </div>
  );
};
