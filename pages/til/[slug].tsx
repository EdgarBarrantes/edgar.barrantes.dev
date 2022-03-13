import type { NextPage } from "next";
import Head from "next/head";
import Info from "../../components/Info";

import Layout from "../../components/Layout";
import { getAllTILs, getTIL, getTILHtml } from "../../utils/data";

interface TilProps {
  til: any;
  content: any;
}

const Til: NextPage<TilProps> = ({ til, content }) => {
  return (
    <div>
      <Head>
        <title>{til.title} - Edgar Barrantes</title>
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
  const tils = getAllTILs();
  return {
    paths: tils.map((til) => {
      return {
        params: {
          slug: til.slug,
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
  const til = getTIL(slug);
  return {
    props: {
      til: til.data,
      content: await getTILHtml(til.content),
    },
  };
}

export default Til;
