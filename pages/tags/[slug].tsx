import type { NextPage } from "next";
import Head from "next/head";
import ContentDisplay from "../../components/ContentDisplay";
import Info from "../../components/Info";

import Layout from "../../components/Layout";
import { getAllTags, getTaggedContent } from "../../utils/data";

interface TagProps {
  tag: any;
  content: any;
}

const Tag: NextPage<TagProps> = ({ tag, content }) => {
  return (
    <div>
      <Head>
        <title>{`#${tag}`} - Edgar Barrantes</title>
        <meta
          name="description"
          content="Edgar Barrantes is a software developer... What you do for a living doesn't define you though."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ContentDisplay
          title={`#${tag}`}
          description={() => <div>Content tagged with {"" + tag}</div>}
          content={content}
        />
        <Info />
      </Layout>
    </div>
  );
};

export async function getStaticPaths() {
  const tags = getAllTags();
  return {
    paths: tags.map((tag) => {
      return {
        params: {
          slug: tag.toString(),
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
  const taggedContent = getTaggedContent(slug);
  return {
    props: {
      tag: slug,
      content: taggedContent,
    },
  };
}

export default Tag;
