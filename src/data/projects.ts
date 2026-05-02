export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Example Project",
    description: "A stunning portfolio project demonstrating modern web technologies.",
    slug: "example-project",
    image: "/images/placeholder.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
  },
  // Add more projects here
];
