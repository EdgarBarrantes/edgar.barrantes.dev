import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import ContentDisplay from "../../components/ContentDisplay";

import Layout from "../../components/Layout";
import { getAllThoughts } from "../../utils/data";
import { Content } from "../../utils/interfaces";

interface ThoughtsProps {
  thoughts: Content[];
}

const Thoughts: NextPage<ThoughtsProps> = ({ thoughts }: ThoughtsProps) => {
  return (
    <div>
      <Head>
        <title>Thoughts - Edgar Barrantes</title>
        <meta
          name="description"
          content="Edgar Barrantes is a software developer... What you do for a living doesn't define you though."
        />
      </Head>
      <Layout>
        <ContentDisplay
          title="Thoughts"
          description={
            <div>
              Musings and notes I take on subjects that I deem important.
              <br /> Some of these are just personal notes that I take in{" "}
              <a
                className="hover:underline font-bold"
                href="https://obsidian.md"
                target="_blank"
                rel="noreferrer"
              >
                Obsidian
              </a>{" "}
              in order to remember things better.
            </div>
          }
          content={thoughts}
        />
      </Layout>
    </div>
  );
};

export async function getStaticProps() {
  const thoughts = getAllThoughts();
  return {
    props: {
      thoughts,
    },
  };
}

export default Thoughts;
