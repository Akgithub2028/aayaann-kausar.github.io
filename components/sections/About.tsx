"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { GitHubUser, GitHubStats, LanguageStat } from "@/lib/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { NeonCard } from "@/components/ui/NeonCard";
import { CountUp } from "@/components/ui/CountUp";
import { FiGithub, FiStar, FiUsers, FiGitMerge, FiUser } from "react-icons/fi";

interface AboutProps {
  user: GitHubUser;
  stats: GitHubStats;
  languageStats: LanguageStat[];
}

export const About: React.FC<AboutProps> = ({ user, stats, languageStats }) => {
  const prefersReduced = useReducedMotion();
  const createdYear = new Date(user.created_at).getFullYear();
  const [streakLoaded, setStreakLoaded] = useState(false);

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <SectionLabel index="01" text="SYSTEM OVERVIEW" />

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_1fr_auto] gap-6 mt-12">
          
          {/* BENTO 1: Identity Card (Spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 h-full"
          >
            <NeonCard className="p-8 h-full flex flex-col justify-center relative overflow-hidden" glowColor="var(--accent-primary)">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 to-transparent pointer-events-none" />
              
              <div className="flex items-center space-x-3 mb-6 border-b border-[var(--bg-border)] pb-4 relative z-10">
                <FiUser className="text-2xl text-[var(--accent-primary)]" />
                <h3 className="text-xl font-orbitron font-bold text-[var(--text-primary)] tracking-widest uppercase">
                  Profile Synopsis
                </h3>
              </div>
              
              <div className="space-y-4 font-space-grotesk text-[var(--text-secondary)] text-sm md:text-base leading-relaxed relative z-10">
                <p>
                  I am an <strong className="text-[var(--text-primary)]">AI Engineer</strong> based in {user.location || "India"}, currently pursuing a B.Tech at IIT Kharagpur. My expertise lies in designing and deploying <strong className="text-[var(--accent-primary)] font-medium">Large Language Models, Quantitative Systems,</strong> and high-performance infrastructure.
                </p>
                <p>
                  I specialize in building <strong className="text-[var(--text-primary)]">autonomous multi-agent systems</strong> and scalable machine learning pipelines that solve complex, real-world problems.
                </p>
                <div className="pt-4 flex flex-wrap gap-4 font-jetbrains text-xs uppercase tracking-widest text-[var(--text-dim)]">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" /> Active Researcher</span>
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" /> Systems Architect</span>
                </div>
              </div>
            </NeonCard>
          </motion.div>

          {/* BENTO 2: Top Languages (Spans 1 col, 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 md:row-span-2 flex min-h-[300px]"
          >
            <NeonCard className="p-6 md:p-8 w-full flex flex-col group relative overflow-hidden" hover={false} glowColor="var(--accent-primary)">
              <div className="absolute inset-0 bg-gradient-to-bl from-[var(--accent-primary)]/5 to-transparent pointer-events-none mask-reveal" />
              <h3 className="text-sm font-orbitron font-bold text-[var(--text-primary)] mb-6 tracking-widest uppercase">
                Language Matrix
              </h3>
              <div className="space-y-6 flex-grow flex flex-col justify-center relative z-10">
                {languageStats.slice(0, 5).map((lang, i) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-xs font-jetbrains mb-2">
                      <span className="text-[var(--text-primary)] uppercase">{lang.name}</span>
                      <span className="text-[var(--accent-primary)]">{lang.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--bg-void)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ 
                          backgroundColor: lang.color,
                          boxShadow: `0 0 10px ${lang.color}`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </NeonCard>
          </motion.div>

          {/* BENTO 3: Mini Stat Cards (Spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { label: "Repos", value: user.public_repos, icon: FiGithub, color: "var(--accent-primary)" },
              { label: "Stars", value: stats.totalStars, icon: FiStar, color: "var(--accent-secondary)" },
              { label: "Forks", value: stats.totalForks, icon: FiGitMerge, color: "var(--accent-metric)" },
              { label: "Followers", value: user.followers, icon: FiUsers, color: "var(--text-primary)" },
            ].map((stat, i) => (
              <NeonCard key={i} className="p-6 h-full flex flex-col justify-center items-center text-center group relative overflow-hidden" glowColor={stat.color}>
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none mask-reveal" style={{ backgroundImage: `linear-gradient(to top, ${stat.color}11, transparent)` }} />
                <stat.icon className="text-2xl mb-3 relative z-10" style={{ color: stat.color }} />
                <div className="text-2xl md:text-3xl font-orbitron font-bold text-[var(--text-primary)] mb-1 relative z-10">
                  <CountUp to={stat.value} />
                </div>
                <div className="text-[10px] font-jetbrains text-[var(--text-dim)] uppercase tracking-widest relative z-10">
                  {stat.label}
                </div>
              </NeonCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
