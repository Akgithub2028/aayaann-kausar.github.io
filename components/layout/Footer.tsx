import React from "react";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-[var(--bg-void)] border-t border-[var(--bg-border)]">
      <div className="container mx-auto px-6 text-center flex flex-col items-center">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-[var(--accent-metric)] animate-pulse" style={{ boxShadow: '0 0 10px var(--accent-metric)' }} />
          <span className="font-jetbrains text-[10px] text-[var(--accent-metric)] uppercase tracking-widest">System Operational</span>
        </div>
        <p className="font-jetbrains text-[10px] text-[var(--text-dim)] uppercase tracking-widest">
          // BUILT WITH NEXT.JS + FRAMER MOTION + GITHUB API
        </p>
        <p className="font-jetbrains text-[10px] text-[var(--text-dim)] uppercase tracking-widest mt-2">
          &copy; {year} SYSTEM ONLINE.
        </p>
      </div>
    </footer>
  );
};
