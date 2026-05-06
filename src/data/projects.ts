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
    title: "Learning out of Messy Piles",
    description: "i forgot about this",
    slug: "example-project",
    image: "/images/loomp.jpg",
    tags: ["C#",],
    github: "https://github.com",
  },

  {
    id: "2",
    title: "SACM",
    description: "Clinic System",
    slug: "example-project",
    image: "/images/SACM2.jpg",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    github: "https://github.com",
  },
  // Add more projects here
];
