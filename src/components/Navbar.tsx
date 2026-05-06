"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Blogs", path: "/blogs" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-2 z-50 w-full bg-white dark:bg-zinc-900 px-6 py-4 transition-all top-0 border-b-[1px] border-black dark:border-white shadow-[0px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_6px_0px_0px_rgba(255,255,255,1)] sm:top-10 sm:mx-auto sm:max-w-3xl sm:border-[3px] sm:rounded-xl sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:sm:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
      <div className="flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <div className="relative h-8 w-8 overflow-hidden rounded-full border-3">
            <Image
              src="/images/pfp.jpg"
              alt="Logo"
              fill
              sizes="32px" // I updated this to 32px since your div is h-8 (32px)
              className="grayscale object-cover"
            />
          </div>
          <span>
            ekoubuyoi
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`font-ubuntu text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 ${pathname === item.path
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 dark:text-zinc-400"
                }`}
            >
              {item.name}
              {pathname === item.path && (
                <span className="block h-0.5 w-full bg-zinc-900 dark:bg-zinc-100" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute left-0 top-full w-full bg-white dark:bg-zinc-900 border-[4px] border-black dark:border-white shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_6px_0px_0px_rgba(255,255,255,1)] rounded-b-2xl transition-all duration-300 ease-in-out transform origin-top ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}>
        <div className="flex flex-col p-6 gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`font-ubuntu text-md font-bold transition-all hover:translate-x-2 ${pathname === item.path
                ? "text-black dark:text-white underline decoration-4 underline-offset-8"
                : "text-zinc-500 dark:text-zinc-400"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
