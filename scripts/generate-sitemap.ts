import { readdirSync, writeFileSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE = 'https://edgar.barrantes.dev';

const staticRoutes = ['', '/projects', '/resume', '/thoughts', '/til', '/newsletter'];

function articles(type: 'thoughts' | 'til') {
  const dir = path.join('content', `_${type}`);
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data } = matter.read(path.join(dir, f));
      return { route: `/${type}/${f.replace(/\.md$/, '')}`, lastmod: data.date ? String(data.date).slice(0, 10) : undefined };
    });
}

const urls = [
  ...staticRoutes.map((route) => ({ route, lastmod: undefined as string | undefined })),
  ...articles('thoughts'),
  ...articles('til'),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ route, lastmod }) =>
    `  <url>\n    <loc>${SITE}${route}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync('public/sitemap.xml', xml);
console.log(`sitemap: ${urls.length} urls`);
