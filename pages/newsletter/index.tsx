import type { NextPage } from "next";
import Head from "next/head";
import { Suspense } from 'react'

import Layout from "../../components/Layout";
import Newsletter from "../../components/Newsletter";
import LoadingState from "../../components/LoadingState";
import SEO from "../../components/SEO";

const Home: NextPage = () => {
  return (
    <div>
      <SEO 
        title="Newsletter"
        description="Weekly stories and insights about software engineering and web3"
      />
      <Layout>
        <Suspense fallback={<LoadingState />}>
          <Newsletter />
        </Suspense>
      </Layout>
    </div>
  );
};

export default Home;
