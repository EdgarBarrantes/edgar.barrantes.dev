import type { NextPage } from "next";
import Head from "next/head";
import Info from "../components/Info";
import Layout from "../components/Layout";
import Navigation from "../components/Nav/Navigation";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Edgar Barrantes</title>
        <meta
          name="description"
          content="Edgar Barrantes is a software developer... What you do for a living doesn't define you though."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout shouldNavigationBeToggable={false}>
        <div className="-mx-4">
          <Navigation />
        </div>
      </Layout>
    </div>
  );
};

export default Home;
