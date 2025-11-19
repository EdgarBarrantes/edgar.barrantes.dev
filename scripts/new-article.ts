#!/usr/bin/env ts-node
/**
 * Script to create a new article (thought or TIL)
 * Usage: npm run new:thought "My Article Title"
 *        npm run new:til "Something I Learned"
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const args = process.argv.slice(2);
const type = process.env.ARTICLE_TYPE || 'thought'; // 'thought' or 'til'
const title = args[0];

if (!title) {
  console.error('Error: Please provide a title');
  console.log(`Usage: npm run new:${type} "Your Article Title"`);
  process.exit(1);
}

// Convert title to slug (URL-friendly)
function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .trim();
}

// Get current date in YYYY-MM-DD format
function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function createArticle() {
  const slug = titleToSlug(title);
  const date = getCurrentDate();
  const templateType = type === 'til' ? 'til' : 'thought';
  const contentDir = type === 'til' ? '_til' : '_thoughts';

  // Read template
  const templatePath = path.join('templates', `${templateType}.md`);
  if (!existsSync(templatePath)) {
    console.error(`Error: Template not found at ${templatePath}`);
    process.exit(1);
  }

  const template = readFileSync(templatePath, 'utf-8');

  // Replace placeholders
  const content = template
    .replace(/title: ".*"/, `title: "${title}"`)
    .replace(/date: ".*"/, `date: "${date}"`)
    .replace(/# .*/,  `# ${title}`)
    .replace(/description: ".*"/, type === 'til'
      ? `description: "Quick technical note about ${title}"`
      : `description: "Insights and thoughts about ${title}"`);

  // Create file
  const filename = `${slug}.md`;
  const filepath = path.join('content', contentDir, filename);

  if (existsSync(filepath)) {
    console.error(`Error: Article already exists at ${filepath}`);
    process.exit(1);
  }

  writeFileSync(filepath, content);

  console.log(`✅ Created new ${type}: ${filepath}`);
  console.log(`📝 Title: ${title}`);
  console.log(`📅 Date: ${date}`);
  console.log(`🔗 Slug: ${slug}`);
  console.log(`\n🚀 Next steps:`);
  console.log(`   1. Edit the file: ${filepath}`);
  console.log(`   2. Add your content`);
  console.log(`   3. Update tags in frontmatter`);
  console.log(`   4. npm run build (to test)`);
  console.log(`   5. Commit and push`);

  // Try to open in default editor (optional)
  if (process.env.EDITOR) {
    try {
      await execAsync(`${process.env.EDITOR} ${filepath}`);
    } catch (error) {
      // Silently fail if editor doesn't open
    }
  }
}

createArticle().catch((error) => {
  console.error('Error creating article:', error);
  process.exit(1);
});
