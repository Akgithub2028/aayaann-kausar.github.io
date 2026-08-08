"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlitchText } from "@/components/ui/GlitchText";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { name: "About",    href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Stack",    href: "#stack" },
  { name: "Certs",    href: "#certifications" },
  { name: "Activity", href: "#contributions" },
  { name: "Contact",  href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' } // Trigger when section is in the middle third of viewport
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
          scrolled 
            ? "bg-[var(--bg-void)]/90 border-b border-[var(--accent-primary)]/40 py-3" 
            : "bg-transparent border-b border-[var(--accent-primary)]/15 py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <GlitchText text="AK" className="text-2xl font-orbitron font-bold text-[var(--accent-primary)]" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`font-space-grotesk text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] uppercase tracking-wide transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:bg-[var(--accent-primary)] after:transition-all after:duration-300 ${
                  activeSection === link.href.replace('#', '') 
                    ? 'text-[var(--text-primary)] after:w-full' 
                    : 'after:w-0'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[var(--accent-primary)] p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FiMenu className="text-2xl" />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[var(--bg-void)] flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button 
                className="text-[var(--accent-primary)] p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiX className="text-4xl" />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center flex-1 space-y-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-orbitron font-bold text-3xl text-[var(--text-primary)] hover:text-[var(--accent-primary)] uppercase tracking-wider"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
