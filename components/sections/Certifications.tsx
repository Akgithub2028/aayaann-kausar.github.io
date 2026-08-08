"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { NeonCard } from "@/components/ui/NeonCard";
import { FiExternalLink } from "react-icons/fi";

export const CertificationsSection = () => {
  const prefersReduced = useReducedMotion();

  const basePath = "/aayaann-kausar.github.io";

  const certifications = [
    {
      title: "5-Day AI Agents Intensive Course",
      issuer: "Kaggle | Google",
      date: "Dec 18, 2025",
      url: "#",
      image: `${basePath}/certs/kaggle.png`
    },
    {
      title: "Advanced Learning Algorithms",
      issuer: "DeepLearning.AI | Stanford Online",
      date: "Jul 11, 2025",
      url: "https://coursera.org/verify/C1OQDIHY9ZC1",
      image: `${basePath}/certs/stanford_advanced.png`
    },
    {
      title: "Supervised Machine Learning: Regression and Classification",
      issuer: "DeepLearning.AI | Stanford Online",
      date: "May 27, 2025",
      url: "https://coursera.org/verify/EG0AHH3IK74L",
      image: `${basePath}/certs/stanford_supervised.png`
    }
  ];

  return (
    <section id="certifications" className="py-20 relative z-10 bg-[var(--bg-void)]">
      <div className="container mx-auto px-6">
        <SectionLabel index="03" text="SECURITY CLEARANCES & CERTS" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <NeonCard className="h-full flex flex-col group relative overflow-hidden p-0" glowColor="var(--accent-violet)">
                
                {/* Certificate Image Banner */}
                <div className="relative w-full h-48 bg-white border-b border-[var(--accent-violet)] border-opacity-30 overflow-hidden">
                  <Image 
                    src={cert.image}
                    alt={cert.title}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] to-transparent pointer-events-none" />
                </div>
                
                {/* Certificate Details */}
                <div className="p-6 flex-grow flex flex-col relative z-10 bg-[var(--bg-surface)]">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-2 py-1 bg-[var(--accent-violet)] bg-opacity-10 text-[var(--accent-violet)] text-[10px] font-jetbrains uppercase tracking-widest border border-[var(--accent-violet)] border-opacity-30 rounded-sm">
                      VERIFIED
                    </span>
                    <span className="text-xs font-jetbrains text-[var(--text-dim)]">{cert.date}</span>
                  </div>
                  
                  <h3 className="font-orbitron font-bold text-lg text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-violet)] transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  
                  <p className="font-jetbrains text-sm text-[var(--text-dim)] uppercase tracking-wider mb-6 flex-grow">
                    {cert.issuer}
                  </p>
                  
                  <div className="pt-4 border-t border-white border-opacity-10 flex justify-end mt-auto">
                    {cert.url !== "#" ? (
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center space-x-2 text-xs font-jetbrains text-[var(--text-dim)] hover:text-[var(--accent-violet)] transition-colors"
                      >
                        <span>VERIFY CREDENTIAL</span>
                        <FiExternalLink />
                      </a>
                    ) : (
                      <span className="flex items-center space-x-2 text-xs font-jetbrains text-[var(--text-dim)] opacity-50 cursor-not-allowed">
                        <span>INTERNAL CREDENTIAL</span>
                      </span>
                    )}
                  </div>
                </div>
              </NeonCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
