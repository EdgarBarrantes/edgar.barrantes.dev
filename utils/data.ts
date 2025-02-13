import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";
import { Content, ArticleData } from "./interfaces";
import { remark } from 'remark'
import html from 'remark-html'

let markdownWorker: Worker;

if (typeof window !== 'undefined') {
  markdownWorker = new Worker(new URL('./markdown.worker.ts', import.meta.url))
}

const getHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};

const getSlug = (filename: string) => filename.replace(/\.md$/, '');

const getTimestamp = (dateStr: string) => new Date(dateStr).getTime();

const validateArticleData = (data: any): ArticleData => {
  return {
    title: data.title || 'Untitled',
    description: data.description || `Notes from ${data.title || new Date().toLocaleDateString()}`,
    date: data.date || new Date().toISOString(),
    tag: data.tag || []
  };
};

const getAllFiles = (type: string) => {
  const rawFiles = fs.readdirSync(path.join(`content/_${type}`));
  const files = rawFiles.map((filename) => {
    const { data } = matter.read(path.join(`content/_${type}`, filename));
    return {
      data: validateArticleData(data),
      filename,
      type,
      slug: getSlug(filename),
    };
  });
  return files;
};

const fixArticleData = (data: any, filename: string, type: string): ArticleData => {
  const fixed = { ...data };

  // Fix missing title
  if (!fixed.title) {
    // Convert filename to title case, remove extension, replace dashes/underscores with spaces
    fixed.title = filename
      .replace(/\.md$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  // Fix missing description
  if (!fixed.description) {
    if (type === 'til') {
      fixed.description = `Quick technical note about ${fixed.title}`;
    } else {
      fixed.description = `Thoughts and insights about ${fixed.title}`;
    }
  }

  // Fix missing date
  if (!fixed.date) {
    // Try to extract date from filename (common format: YYYY-MM-DD-title.md)
    const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      fixed.date = dateMatch[1];
    } else {
      // Use file creation date as fallback
      const stats = fs.statSync(path.join(`content/_${type}`, filename));
      fixed.date = stats.birthtime.toISOString().split('T')[0];
    }
  }

  // Ensure tags array exists
  if (!fixed.tag) {
    fixed.tag = [];
  }

  return fixed as ArticleData;
};

const getFile = (type: string, filename: string) => {
  try {
    const md = matter.read(path.join(`content/_${type}`, `${filename}.md`));
    const fixedData = fixArticleData(md.data, `${filename}.md`, type);
    
    // If we fixed any data, save it back to the file
    if (JSON.stringify(md.data) !== JSON.stringify(fixedData)) {
      const updatedContent = matter.stringify(md.content, fixedData);
      fs.writeFileSync(
        path.join(`content/_${type}`, `${filename}.md`),
        updatedContent
      );
    }

    return {
      ...md,
      data: fixedData,
      content: md.content || ''
    };
  } catch (error) {
    console.error(`Error reading file ${filename} in ${type}:`, error);
    return {
      data: fixArticleData({}, `${filename}.md`, type),
      content: '',
      isEmpty: true
    };
  }
};

const getAllTags = () => {
  const rawTils = fs.readdirSync(path.join(`content/_til`));
  const rawThoughts = fs.readdirSync(path.join(`content/_thoughts`));
  const tags: string[] = [];
  
  rawTils.forEach((tilName) => {
    const { data } = matter.read(path.join(`content/_til`, tilName));
    const tilTags = data.tag?.map((tag: any) => String(tag)) || [];
    tags.push(...tilTags);
  });
  
  rawThoughts.forEach((thoughtName) => {
    const { data } = matter.read(path.join(`content/_thoughts`, thoughtName));
    const thoughtTags = data.tag?.map((tag: any) => String(tag)) || [];
    tags.push(...thoughtTags);
  });
  
  const uniqueTags = new Set(tags);
  return Array.from(uniqueTags);
};

const getTaggedContent = (tag: string): Content[] => {
  const rawTils = fs.readdirSync(path.join(`content/_til`));
  const rawThoughts = fs.readdirSync(path.join(`content/_thoughts`));
  const taggedContent: Content[] = [];

  rawTils.forEach((tilName) => {
    const { data } = matter.read(path.join(`content/_til`, tilName));
    if (contains(data.tag, tag)) {
      taggedContent.push({ 
        data: validateArticleData(data),
        content: '',
        slug: getSlug(tilName), 
        type: "til" 
      });
    }
  });

  rawThoughts.forEach((thoughtName) => {
    const { data } = matter.read(path.join(`content/_thoughts`, thoughtName));
    if (contains(data.tag, tag)) {
      taggedContent.push({
        data: validateArticleData(data),
        content: '',
        slug: getSlug(thoughtName),
        type: "thoughts"
      });
    }
  });

  return taggedContent;
};

const contains = (array: any[] | undefined, text: string) => {
  if (!array) return false;
  return array.some(element => String(element) === text);
};

const getAllThoughts = () => {
  const files = getAllFiles("thoughts");
  return files.sort((a, b) => getTimestamp(b.data.date) - getTimestamp(a.data.date));
};

const getThought = (filename: string) => {
  const file = getFile("thoughts", filename);
  if (file.isEmpty) {
    throw new Error(`Thought ${filename} not found`);
  }
  return file;
};

const getThoughtHtml = async (md: string) => {
  return getHtml(md.replace("![[Index#Sources]]", ""));
};

const getAllTILs = () => {
  const files = getAllFiles("til");
  return files.sort((a, b) => getTimestamp(b.data.date) - getTimestamp(a.data.date));
};

const getTIL = (filename: string) => {
  const file = getFile("til", filename);
  if (file.isEmpty) {
    throw new Error(`TIL ${filename} not found`);
  }
  return file;
};

const getTILHtml = async (md: string) => {
  return getHtml(md);
};

const getPaginatedContent = async (
  type: 'thoughts' | 'til',
  page: number = 1,
  limit: number = 10
) => {
  const allContent = type === 'thoughts' ? 
    await getAllThoughts() : 
    await Promise.resolve(getAllTILs())
  
  const start = (page - 1) * limit
  const end = start + limit
  
  return {
    content: allContent.slice(start, end),
    total: allContent.length,
    currentPage: page,
    totalPages: Math.ceil(allContent.length / limit)
  }
}

export {
  getAllThoughts,
  getThought,
  getThoughtHtml,
  getAllTILs,
  getTIL,
  getTILHtml,
  getAllTags,
  getTaggedContent,
  getPaginatedContent
};
