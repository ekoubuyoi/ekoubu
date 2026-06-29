'use client';

import { projects } from "@/data/projects";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import UnrollingScroll from "@/components/UnrollingScroll";

export default function ProjectsPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.2);
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.1);
  const customFilters = ["All", "Web", "Games", "soom of it"];

  // Filter and dropdown state
  const [activeTag, setActiveTag] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Filter projects by selected tag
  const filteredProjects = activeTag === "All"
    ? projects
    : projects.filter((project) => project.tags.includes(activeTag));

  return (
    <PageTransition>
      <main className="mx-auto flex w-full max-w-3xl flex-col bg-white px-6 sm:px-10 md:px-10 pt-6 sm:pt-16 md:pt-20 pb-22 sm:pb-8 min-h-screen">

        {/* Page header */}
        <div
          ref={headerRef}
          className={`flex flex-col transition-all duration-700 ease-out ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
        <Link href="/" className="group mb-6 underline decoration-2 underline-offset-6 flex items-center text-sm font-bold text-black hover:opacity-70 transition-opacity w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 transition-transform group-hover:-translate-x-1">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>
        <h1 className="text-xl sm:text-3xl font-bold text-black">
          Projects
        </h1>
        <p className="mt-1 text-base sm:text-lg text-gray-600">
          just some things I made
        </p>
      </div>

      {/* Filter dropdown */}
      <div className="relative z-50 mt-8 w-full rounded-xl sm:w-64">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between bg-white px-4 py-2 text-sm font-bold border-3 border-black rounded-xl text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          <span>Filter: {activeTag}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <div className="absolute left-0 top-full mt-2 w-full">
          <UnrollingScroll
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            duration={300}
            contentClassName="border-[3px] border-black rounded-xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            {customFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveTag(tag);
                  setIsOpen(false);
                }}
                className={`flex w-full px-4 py-2.5 text-sm font-bold text-left border-b-2 border-black last:border-b-0 transition-colors ${activeTag === tag
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-zinc-100"
                  }`}
              >
                {tag}
              </button>
            ))}
          </UnrollingScroll>
        </div>
      </div>

      {/* Projects grid */}
      <div
        ref={gridRef}
        className={`grid grid-cols-1 sm:grid-cols-2 gap-10 mt-8 w-full transition-all duration-700 ease-out ${
          gridVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="group flex flex-col border-[3px] border-black rounded-xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 75}ms` }}
          >

            {/* Project thumbnail */}
            <div className="aspect-video bg-zinc-200 relative overflow-hidden border-b-[3px] border-black">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-500 font-bold uppercase tracking-widest text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* Project details */}
            <div className="p-5 flex flex-col gap-2 flex-grow">
              <h3 className="text-lg font-bold underline underline-offset-4 decoration-2">
                {project.title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold border border-black px-2 py-0.5 rounded uppercase tracking-tighter">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-auto flex gap-3 w-full pt-2">
                <a
                  href={project.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center font-bold border-[3px] border-black rounded-lg bg-black text-white hover:bg-white hover:text-black h-10 px-2 text-sm text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                >
                  View Page
                </a>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center font-bold border-[3px] border-black rounded-lg bg-white text-black hover:bg-black hover:text-white h-10 px-2 text-sm text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                  >
                    Github
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </main>
    </PageTransition>
  );
}