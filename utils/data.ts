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

const getAllThoughts = () => {
  return getAllFiles("thoughts").sort((firstThought, secondThought) => {
    console.log("value of first", new Date(firstThought.data.date).valueOf());
    return (
      getTimestamp(secondThought.data.date) -
      getTimestamp(firstThought.data.date)
    );
  });
};

const getThought = (filename: string) => getFile("thoughts", filename);

const getThoughtHtml = async (md: string) => {
  return getHtml(md.replace("![[Index#Sources]]", ""));
};

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
    tags.push(...data.tag);
  });
  rawThoughts.forEach((thoughtName) => {
    const { data } = matter.read(path.join(`content/_thoughts`, thoughtName));
    tags.push(...data.tag);
  });
  const uniqueTags = new Set(tags);
  return Array.from(uniqueTags);
};

const getTaggedContent = (tag: string) => {
  const rawTils = fs.readdirSync(path.join(`content/_til`));
  const rawThoughts = fs.readdirSync(path.join(`content/_thoughts`));
  const taggedContent: Content[] = [];
  // Suboptimal algorithm.
  rawTils.forEach((tilName) => {
    const { data } = matter.read(path.join(`content/_til`, tilName));
    // After removing numbers from tags, we can use: data.tag.includes(tag)
    if (contains(data.tag, tag)) {
      taggedContent.push({ data, slug: getSlug(tilName), type: "til" });
    }
  });
  rawThoughts.forEach((thoughtName) => {
    const { data } = matter.read(path.join(`content/_thoughts`, thoughtName));
    // After removing numbers from tags, we can use: data.tag.includes(tag)
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

const getHtml = async (md: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(md);
  // .process(md.replace(/\[\[/g, "__").replace(/\]\]/g, "__"));
  return result.toString();
};

const getSlug = (filename: string) =>
  filename.split(".")[0]?.replace(/\s/g, "-").toLowerCase();

// Suboptimal solution. Here because gray-matter automatically parses numbers
// in arrays as numbers and not as strings, hence "==".
// After removing year from tags, this should go back to array.contains().
const contains = (array: [], text: string) => {
  let isInArray = false;
  array.forEach((element) => {
    if (element == text) {
      isInArray = true;
    }
  });
  return isInArray;
};

const getTimestamp = (date: string) => {
  const dateArray = date.split("-");
  return new Date(
    `${Number(dateArray[1]) - 1}-${dateArray[0]}-${dateArray[2]}`
  ).valueOf();
};

export {
  getAllThoughts,
  getThought,
  getThoughtHtml,
  getAllTILs,
  getTIL,
  getTILHtml,
  getAllTags,
  getTaggedContent,
};
