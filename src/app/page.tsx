import Image from "next/image";

// to automatically import recent projects
import { projects } from "@/data/projects";
export default function Home() {
  // Get the last project in the array
  const recentProject =
    projects.length > 0 ? projects[projects.length - 1] : null;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-start justify-between bg-white px-10 sm:px-10 md:px-10 pt-6 sm:pt-24 md:pt-20 pb-6 sm:pb-8">
      {/* pfp and text info */}
      <div className="flex items-center justify-between sm:mt-6 mt-2 w-full">
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
            className="text-sm sm:text-base font-medium text-zinc-700 underline underline-offset-4 decoration-zinc-400 hover:text-black hover:decoration-black transition-colors"
          >
            github ↗
          </a>

          {/* resume link */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base font-medium text-zinc-700 underline underline-offset-4 decoration-zinc-400 hover:text-black hover:decoration-black transition-colors"
          >
            resume ↗
          </a>
        </div>
      </div>

      {/* other stuffs/info */}
      <div className="py-8 w-full">
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
          At the moment, I still don't know my niche, but I'm into cybersecurity
          and web development. I know some basic knowledge in some programming
          language such as C, C++, and Web Development.
        </h1>

        <h1 className="border-l-3 pl-5 mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-zinc-800">
          I'm a total tech geek at heart who loves linux. One of my dreams is to
          build raspberry pi typa shi cyberdeck in the future just only for my
          satisfaction. Plus, I really need a thinkpad.
        </h1>

        <h1 className="border-l-3 pl-5 mb-1 mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-zinc-800">
          Sometimes, I write something about techs or sum stuffs when I am
          bored. You can check it if u like at my {}
          <a className="underline font-bold" href="/blogs">
            blogs
          </a>
          .
        </h1>

        {/* projects list */}
        <div className="py-6 w-full flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">Recent Projects</h1>

          {recentProject ? (
            <a
              key={recentProject.id}
              href={recentProject.github} // Make sure 'githubUrl' exists in your projects data
              target="_blank"
              rel="noopener noreferrer"
              className="block border-[3px] border-black p-6 rounded-xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none cursor-pointer"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold underline underline-offset-4 decoration-2">
                  {recentProject.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {recentProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {recentProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[10px] font-bold border border-black px-2 py-0.5 rounded uppercase tracking-tighter"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ) : (
            <div className="border-[3px] border-dashed border-zinc-400 p-6 rounded-xl text-center text-zinc-500">
              No projects found. Check back later!
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
