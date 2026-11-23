# Portfolio

Personal portfolio of Alibek Khakim: projects, tech stack and contacts.

- `client/` — React + TypeScript + Vite single-page app (the site itself).
- `server/` — Express + Prisma + PostgreSQL API for managing projects (optional).

## Run the site

```
cd client
npm install
npm run dev
```

The site works without the server: when the API is unreachable or has no
projects, it shows the list bundled in `client/src/data/projects.ts`. That also
means `npm run build` produces a static site you can host anywhere.

To use the API in production, build with `VITE_API_URL` set to its address.
In development the client looks for it at `http://localhost:5000`.

## Edit the content

| What | Where |
| --- | --- |
| All text in English, Russian and Kazakh (name, intro, about, project descriptions, buttons) | `client/src/i18n/translations.ts` |
| Social links, CV link, tech stack | `client/src/config/site.ts` |
| Projects (without the server): links, technologies, images | `client/src/data/projects.ts` |
| Colours, fonts and layout | `client/src/index.css` |

The language switch is in the navbar. A new project needs an entry in
`projects.ts` plus its texts under the same id in `translations.ts`, once per
language.

To add a CV, put the file at `client/public/resume.pdf` and set `resumeUrl` to
`'/resume.pdf'` — the "Download CV" button appears on its own.

## Run the server (optional)

```
cd server
npm install
# create .env with DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npm run dev
```
