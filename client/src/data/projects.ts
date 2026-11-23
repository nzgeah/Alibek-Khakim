import type { Project } from '../lib/api';

// Projects shown when the API is not reachable or has no projects yet, so the
// site works as a plain static deployment. Add your own entries here.
// Images go in client/public (e.g. images: ['/projects/my-shot.png']).
export const staticProjects: Project[] = [
  {
    id: 'spacebird',
    title: 'Spacebird',
    shortDescription:
      'A 3D space survival and building game made in Godot: play as a robot drifting in orbit, gather resources, craft parts and build your ship.',
    fullDescription:
      'Spacebird is a first-person 3D game set in an orbital debris field. You play as a robot in zero gravity: scan for resources, collect scrap, and craft tools, equipment and building parts from the inventory.\n\nParts snap together into a ship with its own power system, while a mechanical snake roams the level as the enemy. The game has Survival and Creative modes, saved worlds and a diegetic helmet-style interface.',
    technologies: ['Godot 4', 'GDScript'],
    images: ['/projects/spacebird-menu.png', '/projects/spacebird-space.png', '/projects/spacebird-crafting.png'],
    status: 'In development',
    githubLink: 'https://github.com/nzgeah/spacebird',
    isFeatured: true,
  },
  {
    id: 'gaming-cafe-booking',
    title: 'Gaming Café Booking',
    shortDescription:
      'Seat booking for a computer club: pick a seat on an interactive floor map, choose a tariff package, get a booking code.',
    fullDescription:
      'A booking flow for a computer club. Visitors choose an arrival time, pick up to five seats on an interactive map of both floors, and then select a tariff — hourly packages or time-of-day packages priced per seat zone.\n\nPackages are disabled automatically when their time window has passed or a seat is already taken inside the interval. An admin view lists bookings and lets staff approve or cancel them.',
    technologies: ['React', 'Vite', 'React Router', 'Vitest'],
    images: [],
    status: 'Front-end prototype',
    githubLink: 'https://github.com/nzgeah/gaming_cafe_booking',
    isFeatured: true,
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    shortDescription:
      'This site: a personal portfolio with a project catalogue served by its own API.',
    fullDescription:
      'The site you are looking at. The client is a React and TypeScript single-page app; projects come from an Express API backed by PostgreSQL through Prisma, with a JWT-protected admin area. When the API is offline the client falls back to a bundled project list, so it can also be hosted as a static site.',
    technologies: ['React', 'TypeScript', 'Vite', 'Express', 'Prisma', 'PostgreSQL'],
    images: [],
    status: 'In progress',
    githubLink: 'https://github.com/nzgeah/portfolio-aplha-',
    isFeatured: true,
  },
];
