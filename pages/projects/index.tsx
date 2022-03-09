import type { NextPage } from "next";
import Head from "next/head";

import Layout from "../../components/Layout";
import projects from "../../content/projects.json";

const Home: NextPage = () => {
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
      <Layout>
        {" "}
        <div>
          <h1 className="text-4xl font-bold pb-4">Projects</h1>
          <p className="text-xl italic pb-8">
            Open Source projects, available on Github.
          </p>
          <div className="flex flex-wrap">
            {projects.map((project) => {
              return (
                <a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="basis-full sm:basis-1/3 my-3 sm:pr-6 flex"
                >
                  <div className="p-6 transition hover:scale-105 hover:shadow-md bg-indigo-50 dark:bg-indigo-900 rounded-md basis-full">
                    <h1 className="pb-2 font-bold text-clip">
                      {project.title}
                    </h1>
                    <p className="pb-6">{project.description}</p>
                    <div className="-ml-2 mb-2"></div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
