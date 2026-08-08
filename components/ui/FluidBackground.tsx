"use client";
import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (prefersReduced || !canvas) return;

    let fluidInstance: any;

    const initFluid = async () => {
      try {
        // Dynamic import to prevent SSR issues with WebGL/window
        const webGLFluidEnhance = (await import("webgl-fluid")).default;
        fluidInstance = webGLFluidEnhance(canvas, {
          IMMEDIATE: false,
          TRIGGER: "hover",
          SIM_RESOLUTION: 128,
          DYE_RESOLUTION: 1024,
          DENSITY_DISSIPATION: 0.7,
          VELOCITY_DISSIPATION: 0.4,
          PRESSURE: 0.5,
          PRESSURE_ITERATIONS: 20,
          CURL: 20,
          SPLAT_RADIUS: 0.28,
          SPLAT_FORCE: 5000,
          SHADING: true,
          COLORFUL: false,
          COLOR_UPDATE_SPEED: 3,
          PAUSED: false,
          BACK_COLOR: { r: 7, g: 10, b: 15 },
          TRANSPARENT: false,
          BLOOM: true,
          BLOOM_ITERATIONS: 6,
          BLOOM_RESOLUTION: 256,
          BLOOM_INTENSITY: 0.25,
          BLOOM_THRESHOLD: 0.5,
          BLOOM_SOFT_KNEE: 0.7,
          SUNRAYS: false,
        });
      } catch (err) {
        console.error("WebGL Fluid failed to load:", err);
      }
    };

    initFluid();

    return () => {
      // webgl-fluid might not have a clean destroy method, so we just let React unmount the canvas
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[var(--bg-void)]">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-45"
      />
    </div>
  );
};
