import type { NextPage } from "next";
import Head from "next/head";
import Info from "../../components/Info";

import Layout from "../../components/Layout";
import { getAllThoughts, getThought, getThoughtHtml } from "../../utils/data";

interface ThoughtProps {
  thought: any;
  content: any;
}

const Thought: NextPage<ThoughtProps> = ({ thought, content }) => {
  return (
    <div>
      <Head>
        <title>{thought.title} - Edgar Barrantes</title>
        <meta
          name="description"
          content="Edgar Barrantes is a software developer... What you do for a living doesn't define you though."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="prose dark:prose-invert lg:prose-lg">
          <article dangerouslySetInnerHTML={{ __html: content }} />
          <Info />
        </div>
      </Layout>
    </div>
  );
};

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

export default Thought;
