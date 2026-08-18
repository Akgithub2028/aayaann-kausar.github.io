"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { GitHubUser, GitHubStats } from "@/lib/types";
import { GlitchText } from "@/components/ui/GlitchText";
import { CyberButton } from "@/components/ui/CyberButton";
import { NeonCard } from "@/components/ui/NeonCard";
import { ParticleNetwork } from "@/components/ui/ParticleNetwork";

interface HeroProps {
  user: GitHubUser;
  stats: GitHubStats;
}

const ROLES = [
  "Quantitative Trader",
  "Market Microstructure Researcher",
  "Low-Latency C++ Engineer",
  "Autonomous AI Engineer",
];

const INFERENCE_OUTPUT = [
  { delay: 0,    text: "[BACKTEST] Alpha model — Sharpe 2.14, 26.2% OOS CAGR" },
  { delay: 600,  text: "[LATENCY]  SPSC lock-free path @ 1.00us p50 / 1.20us p99" },
  { delay: 1200, text: "[VENUE]    Binance/Coinbase/Kraken/OKX — 3.4M events/sec" },
  { delay: 1800, text: "[RESEARCH] Wunder Fund HFT Challenge — Rank #9 global" },
  { delay: 2400, text: "[STATUS]   All systems nominal. Standing by." },
];

export const Hero: React.FC<HeroProps> = ({ user, stats }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const yLeft = useTransform(scrollY, [0, 800], [0, -50]);
  const yRight = useTransform(scrollY, [0, 800], [0, -90]);

  // Typewriter effect for roles
  useEffect(() => {
    if (prefersReduced) {
      setTypedRole(ROLES[0]);
      return;
    }

    const currentRole = ROLES[roleIndex];
    let typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && typedRole === currentRole) {
      typingSpeed = 2000;
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    } else if (isDeleting && typedRole === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      typingSpeed = 500;
      return;
    }

    const timeout = setTimeout(() => {
      setTypedRole((prev) => 
        isDeleting ? currentRole.substring(0, prev.length - 1) : currentRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedRole, isDeleting, roleIndex, prefersReduced]);

  // Inference console streaming effect
  useEffect(() => {
    if (prefersReduced) {
      setVisibleLines(INFERENCE_OUTPUT.map((_, i) => i));
      return;
    }
    const timeouts = INFERENCE_OUTPUT.map((line, i) => {
      return setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay + 800);
    });
    return () => timeouts.forEach(t => clearTimeout(t));
  }, [prefersReduced]);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 pb-12">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,200,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)'
        }}
      />
      <ParticleNetwork />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT COLUMN */}
          <motion.div 
            initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ y: prefersReduced ? 0 : yLeft }}
            className="flex flex-col space-y-6"
          >
            <div className="font-jetbrains text-[var(--text-dim)] text-sm tracking-wider uppercase">
              <span className="inline-block overflow-hidden whitespace-nowrap animate-[typing_2s_steps(30,end)]">
                // INITIALIZING PORTFOLIO
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-orbitron font-black uppercase tracking-wider animate-electric-bolt drop-shadow-[0_0_15px_rgba(0,200,255,0.4)]">
              {user.name || user.login}
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-space-grotesk font-bold text-[var(--accent-secondary)] h-10">
              {typedRole}
              <span className="animate-[blink_1s_step-end_infinite]">_</span>
            </h2>
            
            <p className="font-space-grotesk text-[var(--text-secondary)] text-base md:text-lg max-w-xl leading-relaxed">
              {user.bio || "Crafting digital experiences in the void."}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <CyberButton href="#projects">VIEW PROJECTS</CyberButton>
              <CyberButton href={user.html_url} variant="ghost" external>GITHUB PROFILE ↗</CyberButton>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-6">
              {[
                { label: "GitHub Stars", value: stats.totalStars.toString() },
                { label: "Repositories", value: user.public_repos.toString() },
                { label: "Followers", value: user.followers.toString() },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center px-5 py-4 bg-[var(--bg-elevated)] border border-[var(--bg-border)] rounded-sm hover:border-[var(--accent-primary)]/50 transition-colors min-w-[100px]">
                  <span className="text-[var(--accent-primary)] font-jetbrains font-bold text-xl">{stat.value}</span>
                  <span className="text-[var(--text-secondary)] font-space-grotesk text-xs tracking-wide mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div 
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: prefersReduced ? 0 : yRight }}
            className="relative flex flex-col justify-center items-center lg:items-end w-full max-w-sm mx-auto lg:mx-0 lg:max-w-md"
          >
            <div className="relative w-[280px] h-[280px] flex items-center justify-center">
              <div 
                className="absolute inset-0 rounded-full blur-[80px] opacity-20"
                style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, var(--accent-secondary) 60%, transparent 100%)' }}
              />
              {/* Rotating Neon Border */}
              {!prefersReduced && (
                <div className="absolute inset-[-10px] rounded-full opacity-50 animate-[spin_4s_linear_infinite]"
                     style={{
                       background: "conic-gradient(from 0deg, transparent 0 340deg, var(--accent-primary) 360deg)"
                     }}
                />
              )}
              {/* Hexagon Avatar */}
              <div 
                className="relative w-full h-full overflow-hidden" 
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                <Image 
                  src={user.avatar_url}
                  alt={user.name || user.login}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Inference Console */}
            <div className="mt-8 w-full">
              <div className="bg-[var(--bg-elevated)] border border-[var(--bg-border)] rounded-sm p-4 font-jetbrains text-xs">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--bg-border)]">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-metric)] animate-pulse" />
                  <span className="text-[var(--text-dim)] uppercase tracking-widest text-[10px]">inference_console</span>
                </div>
                <div className="space-y-1.5 min-h-[105px]">
                  {INFERENCE_OUTPUT.map((line, i) => (
                    <div
                      key={i}
                      className={`transition-opacity duration-300 ${visibleLines.includes(i) ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {line.text.startsWith('[SYSTEM]') || line.text.startsWith('[CORE]') ? (
                        <span className="text-[var(--code-green)]">{line.text}</span>
                      ) : line.text.startsWith('[STATUS]') ? (
                        <span className="text-[var(--accent-metric)]">{line.text}</span>
                      ) : (
                        <span className="text-[var(--text-secondary)]">{line.text}</span>
                      )}
                    </div>
                  ))}
                  {visibleLines.length === INFERENCE_OUTPUT.length && (
                    <span className="inline-block w-2 h-3 bg-[var(--accent-primary)] opacity-80 animate-[blink_1s_step-end_infinite]" />
                  )}
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
