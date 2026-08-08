"use client";

import React, { useState, useEffect } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  duration?: number;
}

export const CountUp: React.FC<CountUpProps> = ({ to, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setCount(to);
      return;
    }
    
    if (inView) {
      let start = 0;
      const end = to;
      if (start === end) return;

      const incrementTime = (duration * 1000) / end;
      const timer = setInterval(() => {
        start += Math.ceil(end / (duration * 60)); 
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [inView, to, duration, prefersReduced]);

  return <span ref={ref}>{count}</span>;
};
