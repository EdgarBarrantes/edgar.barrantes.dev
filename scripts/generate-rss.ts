import { writeFileSync, readdirSync } from 'fs';
import path from 'path';
// @ts-ignore
import matter from 'gray-matter';

interface FeedItem {
  title: string;
  description: string;
  date: string;
  slug: string;
  type: 'thought' | 'til';
}

function getContent(type: string) {
  const dir = path.join(`content/_${type}`);
  const files = readdirSync(dir);
  return files.map((filename) => {
    const { data } = matter.read(path.join(dir, filename));
    return {
      data: {
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
      },
      slug: filename.replace(/\.md$/, ''),
    };
  });
}

async function generate() {
  const thoughts = getContent('thoughts');
  const tils = getContent('til');

  // Combine and sort by date
  const allItems: FeedItem[] = [
    ...thoughts.map((t) => ({ ...t.data, slug: t.slug, type: 'thought' as const })),
    ...tils.map((t) => ({ ...t.data, slug: t.slug, type: 'til' as const }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Edgar Barrantes Brais</title>
    <link>https://edgar.barrantes.dev</link>
    <description>Software engineer passionate about decentralised systems and thoughtful debates. Thoughts on Web3, blockchain, AI, and software development.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://edgar.barrantes.dev/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>Next.js</generator>
    <webMaster>edgar@barrantes.dev (Edgar Barrantes Brais)</webMaster>
    <managingEditor>edgar@barrantes.dev (Edgar Barrantes Brais)</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} Edgar Barrantes Brais</copyright>
    <category>Technology</category>
    <category>Web3</category>
    <category>Blockchain</category>
    <category>Software Development</category>
    <image>
      <url>https://edgar.barrantes.dev/og-image.jpg</url>
      <title>Edgar Barrantes Brais</title>
      <link>https://edgar.barrantes.dev</link>
      <width>1200</width>
      <height>630</height>
    </image>
${allItems.map((item) => {
  const url = `https://edgar.barrantes.dev/${item.type === 'thought' ? 'thoughts' : 'til'}/${item.slug}`;
  const category = item.type === 'thought' ? 'Thoughts' : 'Today I Learned';

  return `    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <category>${category}</category>
      <author>edgar@barrantes.dev (Edgar Barrantes Brais)</author>
    </item>`;
}).join('\n')}
  </channel>
</rss>`;

  writeFileSync('public/rss.xml', rss);
  console.log('✅ RSS feed generated successfully');
}

generate();
