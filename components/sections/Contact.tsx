"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GitHubUser } from "@/lib/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { NeonCard } from "@/components/ui/NeonCard";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

interface ContactProps {
  user: GitHubUser;
}

export const ContactSection: React.FC<ContactProps> = ({ user }) => {
  const prefersReduced = useReducedMotion();

  return (
    <section id="contact" className="py-20 bg-[var(--bg-void)] relative border-t border-[var(--bg-border)]">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <SectionLabel index="07" text="CONTACT" className="justify-center md:justify-start" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mt-12 mb-16 max-w-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-[var(--text-primary)] uppercase tracking-wider mb-6">
            LET&apos;S BUILD <span className="text-[var(--accent-primary)]">SOMETHING.</span>
          </h2>
          <p className="font-space-grotesk text-[var(--text-secondary)] max-w-md text-center mb-10">
            Open to quant research internships, ML engineering roles, and interesting research collaborations.
          </p>
          <a
            href="mailto:aayaannkausar@gmail.com?subject=Let's%20Connect"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] font-orbitron font-bold text-sm tracking-widest uppercase hover:bg-[var(--accent-primary)] hover:text-[var(--bg-void)] hover:shadow-[0_0_15px_var(--accent-primary-20)] transition-all duration-300 rounded-sm mb-16"
          >
            <FiMail className="text-xl" />
            SEND A MESSAGE
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <a href={user.html_url} target="_blank" rel="noreferrer" className="block h-full">
              <NeonCard className="flex flex-col items-center justify-center p-8 text-center h-full group" glowColor="var(--accent-primary)">
                <FiGithub className="text-4xl text-[var(--text-dim)] group-hover:text-[var(--accent-primary)] mb-4 transition-colors duration-300" />
                <h3 className="font-orbitron font-bold text-lg text-[var(--text-primary)]">GITHUB</h3>
                <span className="font-jetbrains text-sm text-[var(--text-dim)] mt-2">@{user.login}</span>
              </NeonCard>
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <a href="https://www.linkedin.com/in/aayaann-kausar-8b2813344/" target="_blank" rel="noreferrer" className="block h-full">
              <NeonCard className="flex flex-col items-center justify-center p-8 text-center h-full group" glowColor="var(--accent-primary)">
                <FiLinkedin className="text-4xl text-[var(--text-dim)] group-hover:text-[var(--accent-primary)] mb-4 transition-colors duration-300" />
                <h3 className="font-orbitron font-bold text-lg text-[var(--text-primary)]">LINKEDIN</h3>
                <span className="font-jetbrains text-sm text-[var(--text-dim)] mt-2">/in/aayaann-kausar</span>
              </NeonCard>
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <a href="mailto:aayaannkausar@gmail.com" className="block h-full">
              <NeonCard className="flex flex-col items-center justify-center p-8 text-center h-full group" glowColor="var(--accent-primary)">
                <FiMail className="text-4xl text-[var(--text-dim)] group-hover:text-[var(--accent-primary)] mb-4 transition-colors duration-300" />
                <h3 className="font-orbitron font-bold text-lg text-[var(--text-primary)]">EMAIL</h3>
                <span className="font-jetbrains text-sm text-[var(--text-dim)] mt-2">Initiate Handshake</span>
              </NeonCard>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
