"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, Variants } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { NeonCard } from "@/components/ui/NeonCard";
import { TECH_STACK } from "@/lib/constants";
import * as SiIcons from "react-icons/si";
import { FiCode, FiLayers } from "react-icons/fi";

const getIcon = (name: string) => {
  const normalized = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  
  if (normalized === "transformers" || normalized === "ray" || normalized === "numba") {
    return <FiLayers className="text-xl transition-colors duration-200" />;
  }

  const iconKey = Object.keys(SiIcons).find(
    (key) => key.toLowerCase() === `si${normalized}` || key.toLowerCase().includes(normalized)
  );

  if (iconKey) {
    const Icon = (SiIcons as any)[iconKey];
    return <Icon className="text-xl transition-colors duration-200" />;
  }

  return <FiCode className="text-xl transition-colors duration-200" />;
};

export const TechStackSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const groupVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: prefersReduced ? 0 : 0.1,
      },
    },
  };

  const dotVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 300, damping: 20 } 
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: prefersReduced ? 0 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, x: prefersReduced ? 0 : -20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 200, damping: 20 } 
    },
  };

  return (
    <section id="stack" className="py-20 bg-[var(--bg-void)]">
      <div className="container mx-auto px-6">
        <SectionLabel index="05" text="CORE COMPETENCIES" />

        <div ref={sectionRef} className="mt-16 max-w-4xl mx-auto space-y-12 relative">
          {/* Animated Vertical Line */}
          {!prefersReduced ? (
            <motion.div 
              className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-50 origin-top"
              style={{ scaleY: lineHeight }}
            />
          ) : (
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-30" />
          )}

          {TECH_STACK.map((group, idx) => (
            <motion.div
              key={idx}
              variants={groupVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-12"
            >
              {/* Layer Node */}
              <motion.div 
                variants={dotVariants}
                className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--accent-primary)] flex items-center justify-center z-10 shadow-[0_0_10px_var(--accent-primary-20)]"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              </motion.div>

              {/* Group Label */}
              <motion.div variants={titleVariants} className="flex flex-col mb-4">
                <h4 className="font-orbitron font-bold text-[var(--text-primary)] uppercase tracking-wider text-lg">
                  {group.category}
                </h4>
              </motion.div>

              {/* Grid of tools */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {group.items.map((item, itemIdx) => (
                  <motion.div key={itemIdx} variants={itemVariants}>
                    <NeonCard 
                      className="flex items-center gap-3 p-3 bg-[var(--bg-elevated)] group cursor-default" 
                      glowColor="var(--accent-primary)"
                    >
                      <div className="text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors duration-200 flex-shrink-0">
                        {getIcon(item)}
                      </div>
                      <span className="font-space-grotesk font-medium text-sm text-[var(--text-primary)] truncate">
                        {item}
                      </span>
                    </NeonCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
