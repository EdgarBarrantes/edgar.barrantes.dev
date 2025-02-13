import type { NextPage } from "next";
import { useState, Suspense } from 'react'
import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { ContentDisplay } from "../../components/ContentDisplay";
import { Info } from "../../components/Info";
import { getAllThoughts } from "../../utils/data";
import { Content } from "../../utils/interfaces";
import { LoadingState } from "../../components/LoadingState";
import dynamic from 'next/dynamic';

// Dynamically import Newsletter component
const Newsletter = dynamic(() => import('@/components/Newsletter').then(mod => mod.Newsletter), {
  loading: () => <div className="h-[320px] animate-pulse bg-muted rounded-lg" />
});

interface ThoughtsProps {
  thoughts: Content[];
  totalPages: number;
  initialTotal: number;
}

const Thoughts: NextPage<ThoughtsProps> = ({ thoughts, totalPages, initialTotal }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState(thoughts)

  return (
    <>
      <Meta
        title="Thoughts on Tech & Innovation"
        description="Deep dives into software architecture, web3 development, and the future of technology. Exploring ideas that shape the digital landscape."
      />
      <Layout>
        <Suspense fallback={<LoadingState />}>
          <ContentDisplay
            title="Thoughts & Insights"
            description={
              <span>
                Explorations of software crafting, decentralized systems, 
                geopolitics, ideas, and more.
                <br />
                For more, see my newsletter below.
              </span>
            }
            content={content}
            isLoading={isLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <div className="my-8">
            <Newsletter />
          </div>
        </Suspense>
      </Layout>
    </>
  );
};

export default Thoughts;

export async function getStaticProps() {
  const thoughts = getAllThoughts()
  return {
    props: {
      thoughts,
      totalPages: 1,
      initialTotal: thoughts.length
    },
    // Revalidate every hour
    revalidate: 3600
  }
}
