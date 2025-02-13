import type { NextPage } from "next";
import Head from "next/head";
import ContentDisplay from "../../components/ContentDisplay";
import { useState, Suspense } from 'react'
import { GetStaticProps } from 'next'
import { getPaginatedContent } from '../../utils/data'

import Layout from "../../components/Layout";
import { getAllTILs } from "../../utils/data";
import { Content } from "../../utils/interfaces";
import LoadingState from "../../components/LoadingState";
import SEO from "../../components/SEO";
import Navigation from "../../components/Nav/Navigation";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <SEO
        title="TIL | Edgar Barrantes"
        description="Things I've learned along the way."
      />
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Navigation onClose={() => setIsOpen(false)} />
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
        </div>
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
