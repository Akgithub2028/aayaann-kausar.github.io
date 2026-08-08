"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { PinnedRepo } from "@/lib/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { NeonCard } from "@/components/ui/NeonCard";
import { FiStar, FiGithub, FiExternalLink } from "react-icons/fi";
import Link from "next/link";

interface ProjectsProps {
  pinnedRepos: PinnedRepo[];
  totalRepos: number;
  githubUrl: string;
}

export const ProjectsSection: React.FC<ProjectsProps> = ({ pinnedRepos, totalRepos, githubUrl }) => {
  const prefersReduced = useReducedMotion();
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const cardCount = pinnedRepos.length + 1;
  const scrollPercent = ((cardCount - 1.2) / cardCount) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${scrollPercent}%`]);

  return (
    <section id="projects" ref={targetRef} className={`relative`} style={{ height: `${(pinnedRepos.length + 1) * 70}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="container mx-auto px-6 absolute top-32 left-0 right-0 z-10">
          <SectionLabel index="04" text="FEATURED PROJECTS" />
        </div>

        <motion.div 
          style={{ x: prefersReduced ? 0 : x }} 
          className={`flex gap-6 lg:gap-12 px-6 lg:px-24 mt-20 ${prefersReduced ? 'overflow-x-auto snap-x' : ''}`}
        >
          {pinnedRepos.map((repo, i) => {
            let domain = "Open Source";
            const nameLower = repo.name.toLowerCase();
            if (nameLower.includes("quant") || nameLower.includes("trade") || nameLower.includes("hft")) domain = "Quant";
            else if (nameLower.includes("ml") || nameLower.includes("ai") || nameLower.includes("transformer")) domain = "ML / AI";
            else if (repo.primaryLanguage?.name === "C++" || nameLower.includes("cp")) domain = "Competitive";

            return (
            <div
              key={repo.name}
              className="w-[85vw] md:w-[450px] lg:w-[500px] flex-shrink-0 snap-center"
            >
              <NeonCard className="h-[360px] flex flex-col p-8 group relative bg-[var(--bg-surface)] backdrop-blur-md" glowColor="var(--accent-primary)">
                {/* Domain Tag */}
                <div className="absolute top-4 right-4 bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] px-2 py-1 rounded-sm text-[10px] font-jetbrains uppercase tracking-widest border border-[var(--accent-secondary)]/20">
                  {domain}
                </div>

                {/* Top Row: Title + Stars */}
                <div className="flex justify-between items-start mb-6 pt-4">
                  <h3 className="font-orbitron font-semibold text-2xl text-[var(--accent-primary)] line-clamp-1 group-hover:text-white transition-colors duration-200">
                    {repo.name}
                  </h3>
                  <div className="flex items-center space-x-2 bg-[var(--bg-void)] border border-[var(--accent-primary)] border-opacity-30 px-3 py-1.5 rounded-sm ml-2">
                    <FiStar className="text-[var(--accent-secondary)] text-sm" />
                    <span className="text-sm font-jetbrains text-[var(--text-primary)]">{repo.stargazerCount}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-space-grotesk text-base text-[var(--text-secondary)] line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {repo.description || "No description provided for this repository."}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {repo.repositoryTopics?.nodes.slice(0, 3).map((node, idx) => (
                    <span 
                      key={idx} 
                      className="text-[11px] font-jetbrains px-2.5 py-1 border border-[var(--bg-border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] rounded-sm"
                    >
                      {node.topic.name}
                    </span>
                  ))}
                </div>

                {/* Bottom Row: Links */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)]/5 to-transparent pointer-events-none mask-reveal" />
                <div className="flex space-x-6 mt-auto pt-5 border-t border-[var(--bg-border)] relative z-10">
                  <a 
                    href={repo.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center space-x-2 text-sm font-jetbrains text-[var(--text-dim)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <FiGithub className="text-lg" />
                    <span>SOURCE</span>
                  </a>
                  {repo.homepageUrl && (
                    <a 
                      href={repo.homepageUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center space-x-2 text-sm font-jetbrains text-[var(--text-dim)] hover:text-[var(--accent-secondary)] transition-colors"
                    >
                      <FiExternalLink className="text-lg" />
                      <span>LIVE</span>
                    </a>
                  )}
                </div>
              </NeonCard>
            </div>
          )})}

          {/* End Card / View All */}
          <div className="w-[85vw] md:w-[300px] flex-shrink-0 flex items-center justify-center">
            <Link 
              href={githubUrl}
              target="_blank"
              className="group flex flex-col items-center justify-center space-y-4 p-8 border border-[var(--accent-primary)] border-opacity-30 rounded-lg hover:bg-[var(--accent-primary)] hover:bg-opacity-10 transition-all"
            >
              <div className="w-16 h-16 rounded-full border border-[var(--accent-primary)] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_var(--accent-primary-20)]">
                <FiExternalLink className="text-2xl text-[var(--accent-primary)]" />
              </div>
              <span className="font-jetbrains text-[var(--accent-primary)] uppercase tracking-widest text-sm text-center">
                View All {totalRepos} Repositories
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
