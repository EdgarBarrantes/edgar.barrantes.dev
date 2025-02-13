import { useState, Suspense } from 'react'
import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { ContentDisplay } from "../../components/ContentDisplay"
import { LoadingState } from "../../components/LoadingState"
import { getAllTILs } from "../../utils/data"
import { Content } from "../../utils/interfaces"

interface TILProps {
  tils: Content[]
  totalPages: number
  initialTotal: number
}

export default function TIL({ tils, totalPages, initialTotal }: TILProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState(tils)

  return (
    <>
      <Meta 
        title="TIL - Daily Tech Insights"
        description="Discover bite-sized tech learnings, coding tips, and development insights from daily software engineering experiences."
      />
      <Layout>
        <Suspense fallback={<LoadingState />}>
          <ContentDisplay
            title="Today I Learned"
            description={
              <span>
                Welcome to my digital garden of technical discoveries! Here, I share concise, 
                practical insights from my daily journey in software development.
                <br />
                <br />
                From debugging tricks to architectural patterns, each entry is crafted to be 
                immediately applicable to your work. Think of it as your technical field notes 
                from the frontlines of modern development.
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
  )
}

export async function getStaticProps() {
  const tils = getAllTILs()
  return {
    props: {
      tils,
      totalPages: 1,
      initialTotal: tils.length
    }
  }
}
