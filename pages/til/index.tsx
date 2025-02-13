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

  const keywords = [
    "Today I Learned",
    "TIL",
    "Tech Insights",
    "Software Engineering",
    "Coding Tips",
    "Development Tips",
    "Programming Insights",
    "Technical Notes",
    "Software Development",
    "Learning Journal",
    "Tech Blog",
    "Developer Notes",
    "Code Snippets",
    "Technical Documentation",
    "Edgar Barrantes",
    "Edgar Barrantes Brais",
    "Web Development",
    "Software Architecture",
    "Best Practices",
    "Technical Writing"
  ]

  return (
    <>
      <Meta 
        title="Today I Learned (TIL) - Daily Tech Insights & Software Engineering Notes"
        description="Discover bite-sized tech learnings, coding tips, and development insights from daily software engineering experiences. A collection of practical programming knowledge and best practices."
        keywords={keywords}
      />
      <Layout>
        <Suspense fallback={<LoadingState />}>
          <ContentDisplay
            title="Today I Learned"
            description={
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Daily Tech Insights & Software Engineering Notes</h2>
                <p className="text-lg text-muted-foreground">
                  Welcome to my digital garden of technical learnings! Here, I share concise, 
                  practical insights from my software engineering journey.
                </p>
                <p className="text-lg text-muted-foreground">
                  From coding tips to architectural patterns, each entry is crafted to be 
                  immediately applicable. Think of it as a living collection of technical field notes.
                </p>
              </div>
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
