import { dictionaries } from '../i18n/translations';
import type { Project } from '../lib/api';

// Projects shown when the API is not reachable or has no projects yet, so the
// site works as a plain static deployment.
//
// To add a project: add an entry here, then add its title, status and
// descriptions under the same id in `projects` in src/i18n/translations.ts
// (once per language). Images go in client/public/projects.
const entries: Omit<Project, 'title' | 'status' | 'shortDescription' | 'fullDescription'>[] = [
  {
    id: 'spacebird',
    technologies: ['Godot 4', 'GDScript'],
    images: [
      '/projects/spacebird-space.png',
      '/projects/spacebird-hangar.png',
      '/projects/spacebird-room.png',
      '/projects/spacebird-crafting.png',
    ],
    githubLink: 'https://github.com/nzgeah/spacebird',
    isFeatured: true,
  },
  {
    id: 'gaming-cafe-booking',
    technologies: ['React', 'Vite', 'React Router', 'Vitest'],
    images: ['/projects/gaming-cafe-map.png', '/projects/gaming-cafe-home.png'],
    githubLink: 'https://github.com/nzgeah/gaming_cafe_booking',
    isFeatured: true,
  },
  {
    id: 'portfolio',
    technologies: ['React', 'TypeScript', 'Vite', 'Express', 'Prisma', 'PostgreSQL'],
    images: ['/projects/portfolio-home.png', '/projects/portfolio-projects.png'],
    githubLink: 'https://github.com/nzgeah/portfolio-aplha-',
    isFeatured: true,
  },
];

export const staticProjects: Project[] = entries.map((entry) => ({
  ...entry,
  ...dictionaries.en.projects[entry.id],
}));
