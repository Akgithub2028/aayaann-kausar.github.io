import React from "react";

interface TerminalBoxProps {
  children: React.ReactNode;
  title?: string;
  prompt?: string;
  className?: string;
}

export const TerminalBox: React.FC<TerminalBoxProps> = ({ 
  children, 
  title = "bash", 
  prompt = "> ", 
  className = "" 
}) => {
  return (
    <div className={`bg-[#05050f] border border-[var(--accent-primary)] rounded-none overflow-hidden ${className}`}>
      {/* Title Bar */}
      <div className="bg-[var(--bg-surface)] border-b border-[var(--accent-primary)] border-opacity-30 px-3 py-1 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-[var(--text-dim)] font-mono text-xs uppercase">{title}</div>
        <div className="w-12"></div> {/* Spacer for centering title */}
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm leading-relaxed text-[var(--text-primary)]">
        {React.Children.map(children, (child, index) => {
          const isLast = index === React.Children.count(children) - 1;
          
          if (typeof child === "string" || typeof child === "number") {
            return (
              <div className="flex mb-1">
                <span className="text-[var(--accent-primary)] mr-2 shrink-0">{prompt}</span>
                <span className="break-words w-full">
                  {child}
                  {isLast && <span className="inline-block w-2 h-4 ml-1 bg-[var(--text-primary)] animate-[blink_1s_step-end_infinite]" />}
                </span>
              </div>
            );
          }
          
          return (
            <div className="flex mb-1">
              <span className="text-[var(--accent-primary)] mr-2 shrink-0">{prompt}</span>
              <div className="break-words w-full flex-1">
                {child}
                {isLast && <span className="inline-block w-2 h-4 ml-1 align-middle bg-[var(--text-primary)] animate-[blink_1s_step-end_infinite]" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
