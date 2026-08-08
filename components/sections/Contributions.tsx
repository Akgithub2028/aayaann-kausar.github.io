"use client";
import React from "react";
import dynamic from "next/dynamic";
import { NeonCard } from "@/components/ui/NeonCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { motion, useReducedMotion } from "framer-motion";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

export const ContributionsSection = ({ username }: { username: string }) => {
  const prefersReduced = useReducedMotion();
  
  return (
    <section id="contributions" className="py-20 relative">
      <div className="container mx-auto px-6">
        <SectionLabel index="06" text="ACTIVITY MATRIX" />
        
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <NeonCard className="p-8 md:p-12 overflow-hidden relative group" glowColor="var(--accent-primary)">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 to-transparent pointer-events-none mask-reveal" />
            
            <div className="flex justify-between items-end mb-8 relative z-10">
              <div>
                <h3 className="font-orbitron font-semibold text-xl text-[var(--accent-primary)] mb-1">
                  Training Frequency
                </h3>
                <p className="font-jetbrains text-sm text-[var(--text-dim)] uppercase tracking-wider">
                  Consistency metric // 365 Days
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <span className="font-jetbrains text-xs text-[var(--accent-primary)]">LIVE</span>
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] animate-pulse" style={{ boxShadow: '0 0 10px var(--accent-primary-20)' }} />
              </div>
            </div>

            <div className="relative z-10 overflow-x-auto pb-4">
              <div className="min-w-[800px] flex justify-center">
                <GitHubCalendar 
                  username={username} 
                  colorScheme="dark"
                  theme={{
                    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                    dark: ['#111827', '#00c8ff33', '#00c8ff66', '#00c8ff99', '#00c8ff'],
                  }}
                  labels={{
                    totalCount: '{{count}} optimizations in the last year'
                  }}
                  blockMargin={5}
                  blockSize={14}
                  fontSize={14}
                />
              </div>
            </div>
          </NeonCard>
        </motion.div>
      </div>
    </section>
  );
};
