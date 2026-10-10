import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";
import { Content, ContentType, ArticleData } from "./interfaces";
import { calculateReadingTime } from "./readingTime";

const contentDir = (type: ContentType) => path.join(process.cwd(), "content", `_${type}`);

const toArticleData = (data: Record<string, unknown>, slug: string): ArticleData => ({
  title: typeof data.title === "string" ? data.title : slug,
  description: typeof data.description === "string" ? data.description : "",
  date: data.date ? String(data.date).slice(0, 10) : "",
  tag: Array.isArray(data.tag) ? data.tag.map(String) : [],
});

const byDateDesc = (a: Content, b: Content) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime();

export const getHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};

export const getAllContent = (type: ContentType): Content[] =>
  fs
    .readdirSync(contentDir(type))
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const { data } = matter.read(path.join(contentDir(type), filename));
      return { type, slug, data: toArticleData(data, slug) };
    })
    .sort(byDateDesc);

export const getRecentContent = (limit: number): Content[] =>
  [...getAllContent("thoughts"), ...getAllContent("til")].sort(byDateDesc).slice(0, limit);

export const getArticle = (type: ContentType, slug: string) => {
  const file = matter.read(path.join(contentDir(type), `${slug}.md`));
  return {
    data: { ...toArticleData(file.data, slug), readingTime: calculateReadingTime(file.content) },
    content: file.content,
  };
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  for (const type of ["thoughts", "til"] as const) {
    getAllContent(type).forEach((c) => c.data.tag.forEach((t) => tags.add(t)));
  }
  return Array.from(tags).sort();
};

export const getTaggedContent = (tag: string): Content[] =>
  [...getAllContent("thoughts"), ...getAllContent("til")]
    .filter((c) => c.data.tag.includes(tag))
    .sort(byDateDesc);
