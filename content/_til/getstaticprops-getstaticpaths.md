---
tag:
  - nextjs
  - react
  - static-site-generation
  - web-development
  - typescript
  - performance
  - seo
title: "Next.js Static Generation: Understanding getStaticProps and getStaticPaths"
description: "A comprehensive guide to implementing static site generation in Next.js using getStaticProps and getStaticPaths for dynamic routes, with TypeScript examples and best practices."
date: '2022-03-13'
---

# Next.js Static Generation: Understanding getStaticProps and getStaticPaths

## Overview

Next.js provides powerful static site generation capabilities through `getStaticProps` and `getStaticPaths`. This guide explains how these functions work together to create optimized, pre-rendered pages with dynamic routes.

## Core Concepts

### getStaticPaths
- Runs at build time
- Specifies which dynamic routes to pre-render
- Required for dynamic routes (e.g., `[slug].tsx`)
- Generates static pages for each path

### getStaticProps
- Runs at build time for each generated path
- Fetches data for each static page
- Receives path parameters from `getStaticPaths`
- Returns props for the page component

## Implementation Guide

### 1. Basic Structure

```typescript
// pages/posts/[slug].tsx

interface Post {
  title: string;
  content: string;
  date: string;
}

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <div>{post.content}</div>
    </article>
  );
}
```

### 2. Implementing getStaticPaths

```typescript
export async function getStaticPaths() {
  // Fetch list of all possible paths
  const posts = await getAllPosts();

  return {
    // Generate paths for each post
    paths: posts.map((post) => ({
      params: { slug: post.slug }
    })),
    // false: show 404 for non-existent paths
    // true: generate page on-demand
    // 'blocking': SSR on-demand
    fallback: false
  };
}
```

### 3. Implementing getStaticProps

```typescript
interface Context {
  params: {
    slug: string;
  };
  preview?: boolean;
  previewData?: any;
}

export async function getStaticProps({ params, preview = false }: Context) {
  try {
    // Fetch data for specific post
    const post = await getPostBySlug(params.slug);
    
    return {
      props: {
        post,
        preview
      },
      // Optional: Revalidate every hour
      revalidate: 3600
    };
  } catch (error) {
    return {
      notFound: true // Returns 404 page
    };
  }
}
```

## Real-World Example: Blog Posts

Here's a complete example for a blog post system:

```typescript
// types/post.ts
interface Post {
  slug: string;
  title: string;
  content: string;
  date: string;
}

// pages/posts/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface PostPageProps {
  post: Post;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = await getAllPosts();

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug }
    })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<PostPageProps, Params> = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }

  try {
    const post = await getPostBySlug(params.slug);
    const content = await processMarkdown(post.content);

    return {
      props: {
        post: {
          ...post,
          content
        }
      },
      revalidate: 3600 // ISR: Update every hour
    };
  } catch (error) {
    return { notFound: true };
  }
};
```

## Advanced Features

### 1. Incremental Static Regeneration (ISR)
```typescript
return {
  props: { data },
  revalidate: 60 // Regenerate page after 60 seconds
};
```

### 2. Preview Mode
```typescript
// pages/api/preview.ts
export default async function handler(req, res) {
  res.setPreviewData({});
  res.redirect(req.query.redirect);
}
```

### 3. Fallback Strategies
- `fallback: false`: Return 404 for non-existing paths
- `fallback: true`: Generate on-demand with loading state
- `fallback: 'blocking'`: Generate on-demand with SSR

## Best Practices

1. **Error Handling**
   - Always implement try-catch blocks
   - Return proper error states
   - Use TypeScript for type safety

2. **Performance**
   - Minimize build time in `getStaticPaths`
   - Use ISR for frequently updated content
   - Implement proper caching strategies

3. **SEO**
   - Include metadata in static generation
   - Implement proper page titles and descriptions
   - Use structured data when appropriate

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs/basic-features/data-fetching)
- [Static Generation Strategies](https://nextjs.org/docs/basic-features/pages#static-generation)
- [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration)

---

*Last Updated: 2022-03-13*

*Tags: #nextjs #react #typescript #ssg #web-development #performance*
