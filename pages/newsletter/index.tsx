import type { NextPage } from "next";
import Head from "next/head";

import Layout from "../../components/Layout";
import Newsletter from "../../components/Newsletter";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Newsletter - Edgar Barrantes</title>
        <meta
          name="description"
          content="Edgar Barrantes is a software engineer... What you do for a living doesn't define you though."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Newsletter />
      </Layout>
    </div>
  );
};

export default Home;
