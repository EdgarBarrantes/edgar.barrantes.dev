import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Edgar Barrantes</title>
        <meta
          name="description"
          content="Edgar Barrantes is a software engineer... What you do for a living doesn't define you though."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`p-0 flex flex-col justify-center items-center min-h-screen light:bg-zinc-50 dark:bg-zinc-700 light:text-zinc-700 dark:text-zinc-50 font-main`}
      >
        <iframe
          className="w-4/5 h-screen"
          src="https://embednotion.com/embed/uvqbw4og"
        ></iframe>
      </main>
    </div>
  );
};

export default Home;
