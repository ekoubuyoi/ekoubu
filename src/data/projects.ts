export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  date: string;
  tags: string[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Learning out of Messy Piles",
    description: "i forgot about this",
    slug: "example-project",
    image: "/images/loomp.jpg",
    date: "2025-01-15",
    tags: ["C#",],
    github: "https://github.com",
  },

  {
    id: "2",
    title: "San Agustin Clinic — Portal",
    description: "San Agustin’s full-stack system streamlines student health services and clinic administration into one integrated platform.",
    slug: "example-project",
    image: "/images/SACM2.jpg",
    date: "2026-04-10",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    github: "https://github.com/matchaejayyy/Computer-Programming-2-",
  },
  
  {
    id: "3",
    title: "Ragbot AI",
    description: "Full-stack web application that empowers barangay officials and residents with tools for disaster preparedness, emergency response coordination, and community management",
    slug: "example-project",
    image: "/images/project-3/ragbot.png",
    date: "2026-03-20",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    github: "https://github.com/ekoubuyoi/Ragbot",
  },
];
