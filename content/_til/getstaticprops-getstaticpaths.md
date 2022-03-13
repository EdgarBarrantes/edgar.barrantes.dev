---
tag: [2022, react, software, nextjs]
title: getStaticProps and getStaticPaths go together
description: Related to dynamic routes in Next.js
---

# getStaticProps and getStaticPaths go together

`getStaticPaths` runs on build in order to prebuild every static content available, it's necesary to implement in dynamic routes (when using something like `[slug].tsx`).

`getStaticProps` is available afterwards to get the file contents (or whatever needed) and will get details from it's correspondings _paths_ entry as parameter.

For example, this is the only way I have to gather all my thoughts:

```typescript
export async function getStaticPaths() {
  const thoughts = getAllThoughts();
  return {
    paths: thoughts.map((thought) => {
      return {
        params: {
          slug: thought.slug,
        },
      };
    }),
    fallback: false,
  };
}

interface Context {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params: { slug } }: Context) {
  const thought = getThought(slug);
  return {
    props: {
      thought: thought.data,
      content: await getThoughtHtml(thought.content),
    },
  };
}
```
