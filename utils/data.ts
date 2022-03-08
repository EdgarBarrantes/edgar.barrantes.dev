import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const getAllThoughts = () => {
  const files = fs.readdirSync(path.join("_thoughts"));
  const thoughts = files.map(async (filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("_thoughts", filename),
      "utf-8"
    );
    const { data, content } = matter(markdownWithMeta);
    console.log(content);
    const mdx = await serialize(content);
    return {
      data,
      content,
      slug: filename.split(".")[0].replaceAll(" ", "-"),
    };
  });
  return thoughts;
};

export { getAllThoughts };
