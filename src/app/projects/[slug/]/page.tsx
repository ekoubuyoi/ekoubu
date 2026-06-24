import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col bg-white px-16 sm:pt-10 pb-22 sm:pb-8 min-h-screen">
      <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block">
        ← Back to Projects
      </Link>
      <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {tag}
          </span>
        ))}
      </div>
      <div className="aspect-video bg-muted rounded-2xl mb-12 flex items-center justify-center text-muted-foreground italic">
        Hero Image Placeholder
      </div>
      <div className="prose prose-neutral max-w-none">
        <h2 className="text-2xl font-semibold mb-4">About this project</h2>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        {/* Add more detailed content here */}
      </div>
    </main>
  );
}
