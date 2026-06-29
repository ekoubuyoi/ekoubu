"use client";

import Image from "next/image";
import Link from "next/link";

import { projects } from "@/data/projects";
import { blogs } from "@/data/blogs";
import PageTransition from "@/components/PageTransition";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Home() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.2);
  const { ref: recentsRef, isVisible: recentsVisible } = useScrollReveal(0.1);
  // Merge projects and blogs into recent feed, sorted by date descending
  const recentItems = [
    ...projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      date: p.date,
      tags: p.tags,
      image: p.image,
      href: p.github ?? "#",
      type: "project" as const,
    })),
    ...blogs.map((b) => ({
      id: b.id,
      title: b.title,
      description: b.description,
      date: b.date,
      tags: b.tags,
      image: b.image,
      href: `/blogs/${b.id}`,
      type: "blog" as const,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  return (
    <PageTransition>
      <main className="mx-auto flex w-full max-w-3xl flex-col items-start justify-between bg-white px-10 sm:px-10 md:px-10 pt-6 sm:pt-24 md:pt-20 pb-14 sm:pb-8">
        {/* pfp and text info */}
        <div
          ref={heroRef}
          className={`flex items-center justify-between sm:mt-6 mt-2 w-full transition-all duration-700 ease-out ${
            heroVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
        {/* pfp + name */}
        <div className="flex items-center gap-5">
          {/* pfp */}
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden border-3 rounded-full grayscale">
            <Image
              src="/images/pfp.jpg"
              alt="Logo"
              fill
              sizes="(max-width: 640px) 64px, 80px"
              className="object-cover"
              priority // Optional: Add this if the profile picture is above the fold (visible immediately on load)
            />
          </div>

          {/* texts */}
          <div className="flex flex-col">
            <h1 className="text-xl underline decoration-2 underline-offset-5 sm:text-2xl font-bold text-black">
              Ekoubuyoi
            </h1>
            <p className="text-base mt-1 sm:text-lg text-gray-600">Developer</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* github link */}
          <a
            href="https://github.com/ekoubuyoi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base font-medium text-zinc-700 underline underline-offset-4 decoration-zinc-400 hover:text-black hover:decoration-black transition-all duration-200 hover:translate-x-1"
          >
            github ↗
          </a>

          {/* resume link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base font-medium text-zinc-700 underline underline-offset-4 decoration-zinc-400 hover:text-black hover:decoration-black transition-all duration-200 hover:translate-x-1"
          >
            resume ↗
          </a>
        </div>
      </div>

      {/* other stuffs/info */}
        <div
          ref={recentsRef}
          className={`py-8 w-full transition-all duration-700 ease-out ${
            recentsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {/* note */}
          <h1 className="border-l-3 pl-5 border-[#983D3C] text-[#983D3C] text-base sm:text-lg leading-relaxed">
          Note: This website is still a work in progress! Some feature might not
          work properly, sorry for the inconvenience. I'll fix it soon :&gt;
        </h1>

        <h1 className="border-l-3 mt-4 pl-5 text-base sm:text-lg leading-relaxed text-zinc-800">
          Hey! I am Ekoubuyoi, also known as bukonatnat. If y'all don't know I
          am studying at {}
          <a className="hover:underline font-bold" href="https://usa.edu.ph/">
            USA
          </a>{" "}
          and taking Computer Science as my course.
        </h1>

        <h1 className="border-l-3 pl-5 mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-zinc-800">
          At the moment, I still don't know my niche, but I badly wanna jump into competitive programming.
          I know some basic knowledge in some programming
          language such as C, C++, and Web Development.
        </h1>

        <h1 className="border-l-3 pl-5 mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-zinc-800">
          I'm a total tech geek at heart who loves linux. One of my dreams is to
          build raspberry pi typa shi cyberdeck in the future just only for my
          satisfaction.
        </h1>

        <h1 className="border-l-3 pl-5 mb-1 mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-zinc-800">
          Sometimes, I write something about techs or sum stuffs when I am
          bored. You can check it if u like at my {}
          <a className="underline font-bold" href="/blogs">
            blogs
          </a>
          .
        </h1>

          {/* recent list — mixes projects & blogs */}
          <div className="py-6 w-full flex flex-col gap-6 stagger-children">
            <h1 className="text-xl underline decoration-2 underline-offset-5 sm:text-2xl font-bold animate-fade-in-up">
              {" "}
              Recents{" "}
            </h1>

          {recentItems.length > 0 ? (
            recentItems.map((item) => {
              const isExternal = item.type === "project";
              const Comp = isExternal ? "a" : Link;
              const extraProps = isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <Comp
                  key={`${item.type}-${item.id}`}
                  href={item.href}
                  {...extraProps}
                  className="block border-[3px] border-black p-6 rounded-xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none animate-fade-in-up"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs font-bold px-1.5 py-0.5 bg-zinc-100 border-2 border-black whitespace-nowrap">
                        {new Date(item.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="text-xs font-bold px-1.5 py-0.5 bg-yellow-300 text-black border-2 border-black whitespace-nowrap">
                        #{item.type}
                      </span>
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs font-bold px-1.5 py-0.5 bg-yellow-300 text-black border-2 border-black whitespace-nowrap">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold underline underline-offset-4 decoration-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Comp>
              );
            })
          ) : (
            <div className="border-[3px] border-dashed border-zinc-400 p-6 rounded-xl text-center text-zinc-500">
              Nothing yet. Check back later!
            </div>
          )}
        </div>
      </div>
    </main>
    </PageTransition>
  );
}
