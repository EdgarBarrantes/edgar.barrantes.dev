import type { NextPage } from "next";
import Head from "next/head";
import ContentDisplay from "../../components/ContentDisplay";
import { useState, Suspense } from 'react'
import { GetStaticProps } from 'next'
import { getPaginatedContent } from '../../utils/data'

import Layout from "../../components/Layout";
import { getAllThoughts } from "../../utils/data";
import { Content } from "../../utils/interfaces";
import LoadingState from "../../components/LoadingState";
import SEO from "../../components/SEO";
import Navigation from "../../components/Nav/Navigation";

interface ThoughtsProps {
  thoughts: Content[];
  totalPages: number;
  initialTotal: number;
}

export const getStaticProps: GetStaticProps = async () => {
  const { content, total, totalPages } = await getPaginatedContent('thoughts', 1)
  
  return {
    props: {
      thoughts: content,
      totalPages,
      initialTotal: total
    },
    revalidate: 60
  }
}

const Thoughts: NextPage<ThoughtsProps> = ({ thoughts, totalPages, initialTotal }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState(thoughts)
  const [isOpen, setIsOpen] = useState(false);

  const handlePageChange = async (page: number) => {
    setIsLoading(true)
    setCurrentPage(page)
    
    try {
      const response = await fetch(`/api/thoughts?page=${page}`)
      const data = await response.json()
      setContent(data.content)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <SEO 
        title="Thoughts | Edgar Barrantes"
        description="Some thoughts on software development, life, and everything in between."
      />
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Navigation onClose={() => setIsOpen(false)} />
          <Suspense fallback={<LoadingState />}>
            <ContentDisplay
              title="Thoughts"
              description={
                <span>
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
                </span>
              }
              content={content}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Suspense>
        </div>
      </Layout>
    </div>
  );
};

export default Thoughts;
