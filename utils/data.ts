import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";
import { Content } from "./interfaces";

let markdownWorker: Worker;

if (typeof window !== 'undefined') {
  markdownWorker = new Worker(new URL('./markdown.worker.ts', import.meta.url))
}

const getAllFiles = (type: string) => {
  const rawFiles = fs.readdirSync(path.join(`content/_${type}`));
  const files = rawFiles.map((filename) => {
    const { data } = matter.read(path.join(`content/_${type}`, filename));
    return {
      data,
      filename,
      type,
      slug: getSlug(filename),
    };
  });
  return files;
};

const getFile = (type: string, filename: string) => {
  const md = matter.read(path.join(`content/_${type}`, `${filename}.md`));
  return md;
};

const getAllThoughts = async () => {
  const files = getAllFiles("thoughts")
  return files.sort((a, b) => getTimestamp(b.data.date) - getTimestamp(a.data.date))
}

const getThought = (filename: string) => getFile("thoughts", filename);

const getThoughtHtml = async (md: string) => {
  return getHtml(md.replace("![[Index#Sources]]", ""))
}

const getAllTILs = () => {
  return getAllFiles("til");
};

const getTIL = (filename: string) => getFile("til", filename);

const getTILHtml = async (md: string) => {
  return getHtml(md);
};

const getAllTags = () => {
  const rawTils = fs.readdirSync(path.join(`content/_til`));
  const rawThoughts = fs.readdirSync(path.join(`content/_thoughts`));
  const tags: string[] = [];
  
  rawTils.forEach((tilName) => {
    const { data } = matter.read(path.join(`content/_til`, tilName));
    const tilTags = data.tag.map((tag: any) => String(tag));
    tags.push(...tilTags);
  });
  
  rawThoughts.forEach((thoughtName) => {
    const { data } = matter.read(path.join(`content/_thoughts`, thoughtName));
    const thoughtTags = data.tag.map((tag: any) => String(tag));
    tags.push(...thoughtTags);
  });
  
  const uniqueTags = new Set(tags);
  return Array.from(uniqueTags);
};

const getTaggedContent = (tag: string) => {
  const rawTils = fs.readdirSync(path.join(`content/_til`));
  const rawThoughts = fs.readdirSync(path.join(`content/_thoughts`));
  const taggedContent: Content[] = [];
  rawTils.forEach((tilName) => {
    const { data } = matter.read(path.join(`content/_til`, tilName));
    if (contains(data.tag, tag)) {
      taggedContent.push({ data, slug: getSlug(tilName), type: "til" });
    }
  });
  rawThoughts.forEach((thoughtName) => {
    const { data } = matter.read(path.join(`content/_thoughts`, thoughtName));
    if (contains(data.tag, tag)) {
      taggedContent.push({
        data,
        slug: getSlug(thoughtName),
        type: "thoughts",
      });
    }
  });
  return taggedContent;
};

const getHtml = async (md: string) => {
  if (typeof window === 'undefined') {
    const result = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeFormat)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(md);
    return result.toString();
  }

  return new Promise((resolve) => {
    markdownWorker.onmessage = (event) => {
      resolve(event.data);
    };
    markdownWorker.postMessage(md);
  });
};

const getSlug = (filename: string) =>
  filename.split(".")[0]?.replace(/\s/g, "-").toLowerCase();

const contains = (array: any[], text: string) => {
  return array.some(element => String(element) === text);
};

const getTimestamp = (date: string) => {
  const dateArray = date.split("-");
  return new Date(
    `${Number(dateArray[1]) - 1}-${dateArray[0]}-${dateArray[2]}`
  ).valueOf();
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
