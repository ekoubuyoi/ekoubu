# Project Structure

This project follows a clean, scalable structure optimized for a portfolio.

## Directories

- **`src/app/`**: Contains the App Router logic, layouts, and pages.
  - `projects/`: The directory for all project-related pages.
  - `projects/[slug]/`: Dynamic routes for individual project details.
- **`src/components/`**: Reusable UI components like `Navbar`, `ProjectCard`, and `ContactForm`.
- **`src/data/`**: Centralized data storage (e.g., `projects.ts`).
- **`src/public/images/`**: Static assets like project screenshots and profile pictures.

## Why this structure?

1. **Separation of Concerns**: Source code is isolated in `src/`, while configuration remains in the root.
2. **Scalability**: New pages or components have clear, predictable locations.
3. **Developer Experience**: Other developers can quickly understand the project layout.
