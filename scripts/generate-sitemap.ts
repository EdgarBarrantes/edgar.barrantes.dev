import { writeFileSync, statSync } from 'fs';
// @ts-ignore
import globby from 'globby';
// @ts-ignore
import prettier from 'prettier';

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'pages/**/*.tsx',
    'content/**/*.md',
    '!pages/_*.tsx',
    '!pages/api',
    '!pages/404.tsx', // Exclude 404 page
    '!pages/**/*\\[*\\].tsx', // Exclude dynamic routes like [slug]
    '!pages/**/*\\[*\\]/**', // Exclude nested dynamic routes
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page: string) => {
          // Get file stats for lastmod
          const stats = statSync(page);
          const lastmod = stats.mtime.toISOString();

          let path = page
            .replace('pages/', '/')
            .replace('pages', '/')
            .replace('.tsx', '')
            .replace('.md', '');

          // Handle content directory paths
          if (path.includes('content/_thoughts/')) {
            path = path.replace('content/_thoughts/', '/thoughts/');
          } else if (path.includes('content/_til/')) {
            path = path.replace('content/_til/', '/til/');
          } else if (path.includes('content/')) {
            path = path.replace('content/', '/');
          }

          // Clean up /index to just /
          path = path.replace(/\/index$/, '');

          // Root path should be empty string
          const route = path === '/index' || path === '/' ? '' : path;

          // Set priority based on page type
          let priority = '0.5';
          let changefreq = 'monthly';

          if (route === '') {
            priority = '1.0';
            changefreq = 'weekly';
          } else if (route.startsWith('/thoughts/') || route.startsWith('/til/')) {
            priority = '0.7';
            changefreq = 'monthly';
          } else if (route === '/thoughts' || route === '/til' || route === '/projects') {
            priority = '0.8';
            changefreq = 'weekly';
          }

          return `
            <url>
              <loc>https://edgar.barrantes.dev${route}</loc>
              <lastmod>${lastmod}</lastmod>
              <changefreq>${changefreq}</changefreq>
              <priority>${priority}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  writeFileSync('public/sitemap.xml', formatted);
  console.log('✅ Sitemap generated successfully');
}

generate(); 