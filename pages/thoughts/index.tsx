import type { NextPage } from "next";
import Head from "next/head";

import Layout from "../../components/Layout";
import { getAllThoughts } from "../../utils/data";

// interface ThoughtsProps {
//   data: {
//     [key: string]: any;
//   };
//   slug: string;
// }

const Thoughts: NextPage = (props) => {
  console.log(props);
  return (
    <div>
      <Head>
        <title>Thoughts - Edgar Barrantes</title>
        <meta
          name="description"
          content="Edgar Barrantes is a software developer... What you do for a living doesn't define you though."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>Thoughts</Layout>
    </div>
  );
};

// export async function getStaticProps() {
// const thoughts = getAllThoughts();
// return {
// props: { paths: thoughts },
// paths: docs.map((doc) => {
//   return {
//     params: {
//       slug: doc,
//     },
//   };
// }),
// fallback: false,
// };
// }

export default Thoughts;
