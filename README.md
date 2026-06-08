# ⚡ ekoubu — Personal Portfolio & Blog

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Package Manager](https://img.shields.io/badge/pnpm-v9.x-F69220?style=flat&logo=pnpm)](https://pnpm.io/)
[![Environment](https://img.shields.io/badge/Dev_Env-Arch_Linux_/_Neovim-1793D1?style=flat&logo=arch-linux)](https://archlinux.org/)

A professional, high-performance personal portfolio and tech blog designed with a bold, retro-modern **Neobrutalist** theme. Built using Next.js (App Router), React 19, and Tailwind CSS v4, this site serves as a dynamic hub for showcasing software projects, posting development logs, and sharing milestones.

---

## 🛠️ Tech Stack

- **Core Framework:** [Next.js 16.2.4](https://nextjs.org/) (App Router layout for optimal performance and SEO)
- **Runtime Library:** [React 19.2.4](https://react.dev/) (Utilizing React 19 server and client rendering features)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly typed schemas for all project and blog posts)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS for custom CSS themes and variables
- **Icons:** [Lucide React](https://lucide.dev/) for crisp, scalable layout icons
- **Content Parsing:** [React Markdown](https://github.com/remarkjs/react-markdown) for parsing dynamic blog entries on the fly
- **Interactive Effects:** [Canvas Confetti](https://github.com/catdad/canvas-confetti) for user interactions
- **Deployment Platform:** Pre-configured with Netlify plugins (`@netlify/plugin-nextjs`) and ready for Vercel

---

## ✨ Key Features

### 🎨 Bold Neo-Brutalist Layout
- Striking high-contrast elements with thick solid borders (`border-[3px] border-black`).
- Flat offset drop-shadows (`shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`).
- Clean, responsive hover transitions (`hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none`) to bring UI elements to life.
- Clean typography using the **Ubuntu Sans** font.

### 📱 Responsive Layout & Dual Navigation
- **Desktop Navigation:** A clean, sticky header bar pinned to the top of the viewport for comfortable widescreen browsing.
- **Mobile Navigation:** An ergonomic bottom navigation bar matching natural thumb ergonomics for excellent mobile UX.

### 📂 Dynamic Project Showcase
- Built with a clean, extensible data model mapping projects from structured TypeScript schemas (`src/data/projects.ts`).
- Automatic rendering of tag badges, metadata, descriptions, and direct repository links.

### ✍️ Markdown-Driven Blogging System
- Dynamic markdown parser renders articles and logs on the fly, loaded from structured blog entries.
- Metadata supports tags, custom dates, and category filtering.

---

## 💻 Development & Environment

This project is developed and tuned in a developer-focused Linux environment:
- **OS:** Arch Linux (running under Wayland/Hyprland)
- **Text Editors / IDE:** Neovim & VS Code
- **Build System:** `pnpm` workspaces for optimized package resolution and caching

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v20+ recommended) and [pnpm](https://pnpm.io/) installed.

### Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ekoubuyoi/ekoubu.git
   cd ekoubu
   ```

2. **Install Dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the Local Development Server:**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

4. **Production Build:**
   ```bash
   pnpm build
   pnpm start
   ```

---

## 📂 Project Directory Structure

```text
├── src/
│   ├── app/                    # Next.js App Router (Layouts & Pages)
│   │   ├── blogs/              # Blog pages & dynamic posts ([id])
│   │   ├── projects/           # Project gallery and details ([slug])
│   │   ├── globals.css         # Tailwind v4 globals & custom themes
│   │   ├── layout.tsx          # Root layout with navbar integration
│   │   └── page.tsx            # Main Landing/Home Page
│   ├── components/             # Reusable UI elements (Navbar, etc.)
│   └── data/                   # Centralized static site data (projects, blogs)
├── public/                     # Static assets (images, profile picture)
├── package.json                # Project dependencies and run scripts
├── tsconfig.json               # TypeScript configuration
└── tailwind.config.ts          # Tailwind configurations
```

---

## 📝 License

Created by **ekoubuyoi**. Feel free to use and adapt this code for your own portfolio website!
