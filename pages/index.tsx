import type { NextPage } from "next";
import Head from "next/head";
import Info from "../components/Info";
import Layout from "../components/Layout";
import Navigation from "../components/Nav/Navigation";

const Home: NextPage = () => {
  const title = "Edgar Barrantes";
  const description =
    "Edgar Barrantes is a software engineer passionate about descentralised systems with extensive experience in full stack development and web 3.";
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://edgar.barrantes.dev/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout shouldNavigationBeToggable={false}>
        <div className="-mx-4">
          <div className="flex flex-wrap justify-center items-center -mt-16">
            <div className="max-w-xl px-4">
              <Info />
            </div>
          </div>
          <Navigation />
        </div>
      </Layout>
    </div>
  );
};

export default Home;
