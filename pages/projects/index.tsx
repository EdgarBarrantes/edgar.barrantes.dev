import type { NextPage } from "next";
import Head from "next/head";
import { useState } from 'react';

import Layout from "../../components/Layout";
import projects from "../../content/projects.json";
import Navigation from "../../components/Nav/Navigation";
import SEO from "../../components/SEO";

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <SEO
        title="Projects | Edgar Barrantes"
        description="Some of the projects I've worked on."
      />
      <Head>
        <title>Projects - Edgar Barrantes</title>
        <meta
          name="description"
          content="Edgar Barrantes is a software engineer... What you do for a living doesn't define you though."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Navigation onClose={() => setIsOpen(false)} />
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
        </div>
      </Layout>
    </div>
  );
};

export default Home;
