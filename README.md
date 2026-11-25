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
projects, it shows the list bundled in `client/src/data/projects.json`. That also
means `npm run build` produces a static site you can host anywhere.

To use the API in production, build with `VITE_API_URL` set to its address.
In development the client looks for it at `http://localhost:5000`.

## Edit the content

| What | Where |
| --- | --- |
| Site text in English, Russian and Kazakh (name, intro, about, buttons) | `client/src/i18n/translations.ts` |
| Social links, CV link, tech stack | `client/src/config/site.ts` |
| Projects: texts in each language, links, technologies, images | the admin page, or `client/src/data/projects.json` |
| Colours, fonts and layout | `client/src/index.css` |

The language switch is in the navbar.

## Admin page

Open `/admin` on the site to add, edit, reorder or delete projects and upload
their images. It has no server: it commits `client/src/data/projects.json` and
the images in `client/public/projects/` to this repository, and the site is
republished about a minute later.

Signing in takes a GitHub fine-grained access token limited to this repository
with **Contents: Read and write**. Only someone with such a token can publish;
everyone else can only view the site. The token is kept in the browser tab and
is never stored in the repository.

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
