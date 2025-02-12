import type { NextPage } from "next";
import Head from "next/head";
import Info from "../../components/Info";
import SEO from '../../components/SEO'
import ArticleSchema from '../../components/SEO/ArticleSchema'

import Layout from "../../components/Layout";
import { getAllTILs, getTIL, getTILHtml } from "../../utils/data";

interface TilProps {
  til: any;
  content: any;
}

const Til: NextPage<TilProps> = ({ til, content }) => {
  return (
    <div>
      <SEO 
        title={til.title}
        description={til.description || "Quick technical note on " + til.title}
        article={true}
      />
      <ArticleSchema
        title={til.title}
        description={til.description || "Quick technical note on " + til.title}
        date={til.date}
        url={`https://edgar.barrantes.dev/til/${til.slug}`}
      />
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
