"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const ScanlineOverlay: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReduced) return null;

  return (
    <>
      <div 
        className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.04]"
        style={{
          background: `repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 2px,
            rgba(0, 0, 0, 0.15) 2px,
            rgba(0, 0, 0, 0.15) 4px
          )`,
        }}
      />
    </>
  );
};
