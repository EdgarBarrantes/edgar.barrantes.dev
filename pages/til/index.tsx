import type { NextPage } from "next";
import Head from "next/head";
import ContentDisplay from "../../components/ContentDisplay";

import Layout from "../../components/Layout";
import { getAllTILs } from "../../utils/data";

interface TILProps {
  tils: {
    data: {
      [key: string]: any;
    };
    slug: string;
    type: string;
  }[];
}

const TIL: NextPage<TILProps> = ({ tils }) => {
  return (
    <div>
      <Head>
        <title>Today I learned - Edgar Barrantes</title>
        <meta
          name="description"
          content="Edgar Barrantes is a software engineer... What you do for a living doesn't define you though."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ContentDisplay
          title="Today I learned..."
          description={
            <span>
              Quick notes that I take regarding something new learned, mostly
              software development focused.
              <br />
              It&apos;s my small garden to store the bits and pieces of useful
              information that might one day help you as well.
            </span>
          }
          content={tils}
        />
      </Layout>
    </div>
  );
};

export async function getStaticProps() {
  const tils = getAllTILs();
  return {
    props: {
      tils,
    },
  };
}

export default TIL;
