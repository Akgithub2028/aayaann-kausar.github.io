"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { NeonCard } from "@/components/ui/NeonCard";
import { FiAward, FiTarget, FiTrendingUp, FiX } from "react-icons/fi";

export const ResumeSection = () => {
  const prefersReduced = useReducedMotion();
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const achievements = [
    { title: "JEE Main 2024", description: "Rank among 1.4M+ candidates", top: "Top 0.29%" },
    { title: "JEE Advanced 2024", description: "Rank among 250K+ candidates", top: "Top 3.2%" },
    { title: "WBJEE 2024", description: "Rank among 113K+ candidates", top: "Top 0.20%" },
  ];

  return (
    <>
      <section id="resume" className="py-20 relative z-10 bg-[var(--bg-void)]">
        <div className="container mx-auto px-6">
          <SectionLabel index="02" text="AWARDS & ACHIEVEMENTS" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* Column 1: Competitions / Benchmark Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col h-full space-y-8"
            >
              <NeonCard glowColor="var(--accent-secondary)" className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6 border-b border-[var(--bg-border)] pb-4">
                  <div className="flex items-center space-x-3">
                    <FiTarget className="text-2xl text-[var(--accent-secondary)]" />
                    <h3 className="text-xl font-orbitron font-bold text-[var(--text-primary)] tracking-widest uppercase">
                      HFT Challenge
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="font-jetbrains text-[var(--accent-secondary)] text-xs uppercase tracking-widest">Wunder Fund</div>
                    <div className="font-jetbrains text-[var(--text-dim)] text-[10px]">Sep 2025 - Nov 2025</div>
                  </div>
                </div>

                <div className="flex-grow">
                  <h4 className="font-space-grotesk font-semibold text-[var(--text-primary)] text-lg mb-6 leading-tight">
                    Market State Forecasting Challenge
                  </h4>

                  {/* Metric Pills */}
                  <div className="flex gap-4 mb-8">
                    <div className="flex flex-col flex-1 bg-[var(--bg-void)] border border-[var(--accent-secondary)]/30 rounded-sm p-4 items-center justify-center relative overflow-hidden">
                      <div className="absolute top-0 w-full h-[2px] bg-[var(--accent-secondary)]" />
                      <span className="text-[var(--text-secondary)] font-jetbrains text-xs mb-1 uppercase tracking-wider">Global Rank</span>
                      <span className="text-3xl font-orbitron font-bold text-[var(--text-primary)]">#9</span>
                    </div>
                    <div className="flex flex-col flex-1 bg-[var(--bg-void)] border border-[var(--accent-metric)]/30 rounded-sm p-4 items-center justify-center relative overflow-hidden">
                      <div className="absolute top-0 w-full h-[2px] bg-[var(--accent-metric)]" />
                      <span className="text-[var(--text-secondary)] font-jetbrains text-xs mb-1 uppercase tracking-wider">R² Score</span>
                      <span className="text-3xl font-orbitron font-bold text-[var(--accent-metric)]">0.392</span>
                    </div>
                  </div>

                  <ul className="space-y-4 font-space-grotesk text-sm text-[var(--text-secondary)] list-none pl-0">
                    <li className="relative pl-5">
                      <span className="absolute left-0 top-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
                      Secured 9th global rank, achieving 0.3920 R² on private leaderboard via uncertainty-weighted regression.
                    </li>
                    <li className="relative pl-5">
                      <span className="absolute left-0 top-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
                      Designed 4-layer Transformer with MAE pretraining and statistical context fusion for market state forecasting.
                    </li>
                    <li className="relative pl-5">
                      <span className="absolute left-0 top-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
                      Accelerated inference via torch.compile and Numba, optimizing execution latency for high-frequency trading environments.
                    </li>
                  </ul>
                </div>
              </NeonCard>
            </motion.div>

            {/* Column 2: Achievements & View Resume Button */}
            <div className="space-y-8 flex flex-col h-full">
              <motion.div
                initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-grow"
              >
                <NeonCard glowColor="var(--accent-primary)" className="p-8 h-full flex flex-col">
                  <div className="flex items-center space-x-3 mb-6 border-b border-[var(--bg-border)] pb-4">
                    <FiAward className="text-2xl text-[var(--accent-primary)]" />
                    <h3 className="text-xl font-orbitron font-bold text-[var(--text-primary)] tracking-widest uppercase">
                      SCHOLASTIC ACHIEVEMENTS
                    </h3>
                  </div>

                  <div className="space-y-6 flex-grow flex flex-col justify-center">
                    {achievements.map((ach, idx) => (
                      <div key={idx} className="group border-b border-[var(--bg-border)] pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h4 className="font-space-grotesk font-semibold text-[var(--text-primary)] text-base">{ach.title}</h4>
                            <p className="font-jetbrains text-[10px] text-[var(--text-dim)] uppercase tracking-wider mt-1">{ach.description}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-jetbrains text-[10px] text-[var(--text-secondary)] uppercase tracking-widest block mb-1">STANDING</span>
                            <span className="font-orbitron font-bold text-xl text-[var(--accent-primary)] group-hover:scale-110 transition-transform origin-right inline-block whitespace-nowrap">
                              {ach.top}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </NeonCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <NeonCard glowColor="var(--text-primary)" className="p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[var(--accent-primary)]/5 group-hover:bg-[var(--accent-primary)]/10 transition-colors" />
                  <div className="flex items-center gap-3 mb-8">
                    <FiTrendingUp className="text-[var(--accent-primary)] text-xl" />
                    <h3 className="font-orbitron font-bold text-xl text-[var(--text-primary)] uppercase tracking-widest">
                      FULL PROFILE
                    </h3>
                  </div>
                  <p className="font-space-grotesk text-sm text-[var(--text-secondary)] mb-6">
                    For a complete breakdown of my work experience, publications, and deep-dive technical projects, you can access my full curriculum vitae.
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(true);
                    }}
                    className="relative z-10 inline-flex items-center justify-center w-full py-3 px-6 bg-[var(--bg-void)] border-2 border-[var(--bg-border)] text-[var(--text-primary)] font-orbitron font-bold tracking-widest uppercase hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[0_0_15px_var(--accent-primary-20)] transition-all duration-300 cursor-pointer"
                  >
                    [ VIEW RESUME ]
                  </button>
                </NeonCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12"
              style={{ zIndex: 9999 }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl h-[85vh] bg-[var(--bg-surface)] border border-[var(--bg-border)] rounded-sm shadow-[0_0_50px_var(--accent-primary-20)] overflow-hidden flex flex-col"
              >
                <div className="flex justify-between items-center p-4 border-b border-[var(--bg-border)] bg-[var(--bg-elevated)]">
                  <span className="font-orbitron font-bold text-[var(--text-primary)] tracking-widest uppercase">CV_TERMINAL_VIEW</span>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors p-1"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
                <div className="flex-grow w-full h-full bg-white relative">
                  <iframe
                    src="/resume.pdf"
                    className="w-full h-full border-none absolute inset-0"
                    title="Resume"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
