# edgar.barrantes.dev

Personal site: resume, projects and short technical notes. Next.js (pages router), TypeScript, Tailwind.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # also regenerates public/sitemap.xml and public/rss.xml
```

## Content

- `content/_til/*.md` and `content/_thoughts/*.md` are the notes. Frontmatter: `title`, `description`, `date` (YYYY-MM-DD), `tag` (list).
- `npm run new:til "Title"` or `npm run new:thought "Title"` creates a file from `templates/`.
- `content/projects.json` lists projects; `featured: true` puts one on the home page.
- The resume lives in `pages/resume/index.tsx`. "Save as PDF" uses the browser print dialog.
