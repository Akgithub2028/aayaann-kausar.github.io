import React from "react";
import Link from "next/link";

interface CyberButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
}

export const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}) => {
  const isPrimary = variant === "primary";
  
  const baseClasses = `relative inline-flex items-center justify-center font-orbitron font-semibold uppercase tracking-wider transition-all duration-300 overflow-hidden group ${className}`;
  
  const variantClasses = isPrimary 
    ? "bg-[var(--accent-primary)] text-[var(--bg-void)] hover:shadow-[0_0_15px_var(--accent-primary)] hover:tracking-[0.05em]" 
    : "bg-transparent border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:shadow-[0_0_15px_var(--accent-primary)] hover:tracking-[0.05em]";
    
  const sizeClasses = 
    size === "sm" ? "px-4 py-2 text-xs" :
    size === "md" ? "px-6 py-3 text-sm" :
    "px-8 py-4 text-base";
    
  const ButtonContent = (
    <>
      <span className="relative z-10">{children}</span>
      
      {/* Scanline hover effect */}
      <span className="absolute inset-0 z-0 h-[1px] w-full bg-white opacity-50 shadow-[0_0_8px_white] -translate-y-full group-hover:animate-[scanline_0.3s_ease-in-out_1]" />
      
      {/* Ghost hover background fill */}
      {!isPrimary && (
        <span className="absolute inset-0 bg-[var(--accent-primary)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${baseClasses} ${variantClasses} ${sizeClasses}`}
        >
          {ButtonContent}
        </a>
      );
    }
    return (
      <Link href={href} className={`${baseClasses} ${variantClasses} ${sizeClasses}`}>
        {ButtonContent}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variantClasses} ${sizeClasses}`}
    >
      {ButtonContent}
    </button>
  );
};
