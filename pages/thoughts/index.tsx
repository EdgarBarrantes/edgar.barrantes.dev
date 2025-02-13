import type { NextPage } from "next";
import { useState, Suspense } from 'react'
import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { ContentDisplay } from "../../components/ContentDisplay";
import { Info } from "../../components/Info";
import { getAllThoughts } from "../../utils/data";
import { Content } from "../../utils/interfaces";
import { LoadingState } from "../../components/LoadingState";

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
                In-depth explorations of software engineering, decentralized systems, 
                and technological innovations that are shaping our digital future.
                <br /><br />
                These articles are crafted in{" "}
                <a
                  className="hover:underline font-bold"
                  href="https://obsidian.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  Obsidian
                </a>{" "}
                using connected thought principles to create a rich tapestry of 
                interlinked ideas and practical insights.
              </span>
            }
            content={content}
            isLoading={isLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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
    }
  }
}
