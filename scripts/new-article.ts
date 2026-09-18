/**
 * Create a new note from a template.
 *   npm run new:thought "Title"
 *   npm run new:til "Title"
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

const type = process.env.ARTICLE_TYPE === 'til' ? 'til' : 'thought';
const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error(`Usage: npm run new:${type} "Title"`);
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');
const date = new Date().toISOString().slice(0, 10);
const filepath = path.join('content', type === 'til' ? '_til' : '_thoughts', `${slug}.md`);

if (existsSync(filepath)) {
  console.error(`Already exists: ${filepath}`);
  process.exit(1);
}

const content = readFileSync(path.join('templates', `${type}.md`), 'utf-8')
  .replace('title: "Title"', `title: "${title.replace(/"/g, '\\"')}"`)
  .replace('date: "YYYY-MM-DD"', `date: "${date}"`)
  .replace('# Title', `# ${title}`);

writeFileSync(filepath, content);
console.log(filepath);
