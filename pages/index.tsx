import { useState } from 'react';
import type { NextPage } from "next";
import Head from "next/head";
import Info from "../components/Info";
import Layout from "../components/Layout";
import Navigation from "../components/Nav/Navigation";
import SEO from '../components/SEO'

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const title = "Edgar Barrantes";
  const description =
    "Edgar Barrantes is a software engineer passionate about descentralised systems with extensive experience in full stack development and web 3.";
  return (
    <div>
      <SEO
        title="Edgar Barrantes"
        description="Software engineer. I enjoy working on decentralised applications, debating ideas and going here and there."
      />
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://edgar.barrantes.dev/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-2xl w-full">
            <div className="mb-8">
              <Info />
            </div>
          </div>
          <Navigation onClose={() => setIsOpen(false)} />
        </div>
      </Layout>
    </div>
  );
};

export default Home;
