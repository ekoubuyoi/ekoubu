"use client";

import { usePageEntrance } from "@/hooks/useScrollReveal";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Page entrance transition wrapper.
 * Applies fade-in animation using GPU-accelerated properties.
 */
export default function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  const isLoaded = usePageEntrance();

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}