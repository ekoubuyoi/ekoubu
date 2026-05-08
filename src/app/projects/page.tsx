import { projects } from "@/data/projects";
import Link from "next/link";;

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col bg-white px-6 sm:px-10 md:px-10 pt-10 sm:pt-16 md:pt-20 pb-6 sm:pb-8 min-h-screen">
      <div className="flex flex-col">
        <Link href="/" className="group mb-6 underline decoration-2 underline-offset-6 flex items-center text-sm font-bold text-black hover:opacity-70 transition-opacity w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 transition-transform group-hover:-translate-x-1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back
        </Link>
        <h1 className="text-xl sm:text-3xl font-bold text-black">
          Projects
        </h1>
        <p className="mt-1 text-sm sm:text-base text-gray-600">
          just some things I made
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-8 w-full">
        {projects.map((project) => (
          <div key={project.id} className="group flex flex-col border-[3px] border-black rounded-xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none overflow-hidden">
            <div className="aspect-video bg-zinc-200 relative overflow-hidden border-b-[3px] border-black">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-500 font-bold uppercase tracking-widest text-sm">
                  No Image
                </div>
              )}
            </div>
            <div className="p-5 flex flex-col gap-2 flex-grow">
              <h3 className="text-lg font-bold underline underline-offset-4 decoration-2">
                {project.title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold border border-black px-2 py-0.5 rounded uppercase tracking-tighter">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center justify-center font-bold border-2 border-black rounded-lg transition-colors bg-black text-white hover:bg-white hover:text-black h-9 px-4 py-2 w-full text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
