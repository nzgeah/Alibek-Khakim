// Settings that are the same in every language. All visible text (name,
// intro, about, project descriptions) lives in src/i18n/translations.ts.
import type { Dictionary } from '../i18n/translations';

export const site = {
  // The GitHub repository the admin page publishes to, as "owner/name". On
  // GitHub Pages it is detected from the address; this is used elsewhere
  // (for example when running the site locally).
  repository: 'nzgeah/Alibek-Khakim',
  // Put your CV at client/public/resume.pdf and set this to '/resume.pdf'.
  resumeUrl: '',
  socials: [
    { name: 'GitHub', handle: '@nzgeah', url: 'https://github.com/nzgeah' },
    { name: 'Telegram', handle: '@MicahKebila', url: 'https://t.me/MicahKebila' },
    { name: 'Instagram', handle: '@frnzgeah', url: 'https://instagram.com/frnzgeah' },
  ],
} as const;

export const skillGroups: { key: keyof Dictionary['skillGroups']; skills: string[] }[] = [
  { key: 'languages', skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Dart'] },
  { key: 'frameworks', skills: ['React', 'Vite', 'Node.js', 'Express.js', 'Django', '.NET', 'JWT', 'NPM'] },
  { key: 'databases', skills: ['PostgreSQL'] },
  { key: 'gamedev', skills: ['Unity', 'Godot', 'Itch.io'] },
  { key: 'design', skills: ['Figma', 'Canva', 'Blender', 'SketchUp', 'Aseprite', 'Adobe Photoshop', 'After Effects', 'Premiere Pro', 'Audition'] },
  { key: 'tools', skills: ['Git', 'GitHub', 'Postman', 'Cisco'] },
];
