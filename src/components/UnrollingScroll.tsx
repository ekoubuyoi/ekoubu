"use client";

import React from "react";

interface UnrollingScrollProps {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
  contentClassName?: string;
  duration?: number;
}

/**
 * Smooth expand/collapse container using CSS Grid row transitions.
 * Prevents border clipping through isolated overflow context.
 */
export default function UnrollingScroll({
  children,
  isOpen,
  className = "",
  contentClassName = "",
  duration = 300,
}: UnrollingScrollProps) {
  
  const durationClass = 
    duration <= 150 ? "duration-150" : 
    duration <= 200 ? "duration-200" : 
    duration <= 500 ? "duration-500" : "duration-300";

  return (
    <div
      className={`absolute left-0 right-0 z-50 grid transition-all ease-in-out ${durationClass} ${
        isOpen 
          ? "grid-rows-[1fr] opacity-100 pointer-events-auto" 
          : "grid-rows-[0fr] opacity-0 pointer-events-none"
      } ${className}`}
    >
      {/* Overflow wrapper with padding to prevent border clipping during transition */}
      <div className="overflow-hidden pt-1 px-1 pb-3">
        <div 
          className={`
            bg-white 
            border-[3px] border-black 
            rounded-xl 
            shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
            overflow-hidden
            ${contentClassName}
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}