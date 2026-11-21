# edgar.barrantes.dev

Personal site: resume, projects and short technical notes. Next.js (pages router), TypeScript, Tailwind.
Type: Schibsted Grotesk for headings and small data, Source Serif 4 for running text (both via `next/font`). Lists, not cards.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # also regenerates public/sitemap.xml and public/rss.xml
npm run deploy   # builds the image here and runs it on poseidon (over SSH, no registry)
```

Hosting: Edgar's server poseidon, behind Cloudflare (see `~/Code/olympus`). Nothing deploys on push:
commit, then `npm run deploy`. The image is a standalone Next.js server; `/api/health` is its health check.

## Content

- `content/_til/*.md` and `content/_thoughts/*.md` are the notes. Frontmatter: `title`, `description`, `date` (YYYY-MM-DD), `tag` (list).
- `npm run new:til "Title"` or `npm run new:thought "Title"` creates a file from `templates/`.
- `content/projects.json` lists projects; `featured: true` puts one on the home page.
- The resume lives in `pages/resume/index.tsx`. "Save as PDF" uses the browser print dialog.
