"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Briefcase, BookText, MessagesSquare } from "lucide-react";
import { useState, useEffect } from "react";

// Navigation menu configuration
const navItems = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: Briefcase,
  },
  {
    name: "Blogs",
    path: "/blogs",
    icon: BookText,
  },
  {
    name: "Connect",
    path: "/connect",
    icon: MessagesSquare,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Top Navbar (Desktop) */}
      <nav
        className={`hidden md:block sticky top-10 z-50 w-full bg-white px-4 py-4 transition-all duration-700 ease-out
        border-[3px] border-black rounded-xl mx-auto max-w-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-black transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3">
              <Image
                src="/images/pfp.jpg"
                alt="Logo"
                fill
                sizes="32px"
                className="grayscale object-cover"
              />
            </div>
            <span className="font-bold transition-transform duration-200 group-hover:translate-x-1">ekoubuyoi</span>
          </Link>

          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`font-ubuntu text-sm font-medium relative transition-colors duration-200 hover:text-zinc-900 ${pathname === item.path ? "text-zinc-900" : "text-zinc-500"
                  }`}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-zinc-900 animate-scale-in" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div
        className={`md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t-[3px] border-black transition-all duration-700 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex h-full items-center justify-center gap-12 font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                // justify-center on the link keeps icon and text aligned
                className="flex flex-col items-center justify-center group transition-all duration-200 min-w-[60px]"
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-all duration-200 ${isActive ? "text-black scale-110" : "text-zinc-400 group-hover:text-black group-hover:scale-110"
                    }`}
                />
                <span
                  className={`text-[10px] mt-1 uppercase tracking-wider transition-all duration-200 ${isActive ? "text-black font-bold scale-105" : "text-zinc-500 group-hover:text-black group-hover:scale-105"
                    }`}
                >
                  {item.name}
                </span>

                {/* Optional: Indicator dot for active state to add extra "balance" */}
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-black rounded-full animate-scale-in" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}