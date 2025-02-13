import { getAllThoughts, getAllTILs } from './data'
import type { Content, Project, ArticleData, SearchableContent } from './interfaces'
import projects from '../content/projects.json'

export interface BaseSearchResult {
  source: 'thought' | 'til' | 'project'
  relevance: number
  slug: string
  title: string
  description: string
  date?: string
  tag?: string[]
}

export interface ArticleSearchResult extends BaseSearchResult {
  source: 'thought' | 'til'
  data: ArticleData
  filename: string
  type: 'til' | 'thoughts'
}

export interface ProjectSearchResult extends BaseSearchResult {
  source: 'project'
  href: string
}

export type SearchResult = ArticleSearchResult | ProjectSearchResult

function calculateRelevance(searchTerm: string, content: { 
  title: string
  description: string
  tags?: string[]
  date?: string 
}): number {
  const searchLower = searchTerm.toLowerCase()
  let score = 0

  // Title match (highest weight)
  if (content.title.toLowerCase().includes(searchLower)) {
    score += 10
    // Exact title match gets bonus
    if (content.title.toLowerCase() === searchLower) {
      score += 5
    }
  }

  // Description match
  if (content.description?.toLowerCase().includes(searchLower)) {
    score += 5
  }

  // Tag matches
  if (content.tags?.some((t: string) => t.toLowerCase().includes(searchLower))) {
    score += 3
  }

  // Date recency bonus (if exists)
  if (content.date) {
    const date = new Date(content.date)
    const now = new Date()
    const monthsOld = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)
    if (monthsOld < 6) {
      score += 2
    } else if (monthsOld < 12) {
      score += 1
    }
  }

  return score
}

export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return []
  }

  const searchTerm = query.toLowerCase()

  // Get all content
  const thoughts = getAllThoughts().map(thought => ({
    ...thought,
    source: 'thought' as const,
    title: thought.data.title,
    description: thought.data.description,
    date: thought.data.date,
    tag: thought.data.tag,
    relevance: 0
  })) as ArticleSearchResult[]

  const tils = getAllTILs().map(til => ({
    ...til,
    source: 'til' as const,
    title: til.data.title,
    description: til.data.description,
    date: til.data.date,
    tag: til.data.tag,
    relevance: 0
  })) as ArticleSearchResult[]

  const projectItems = (projects as Project[]).map(project => ({
    title: project.title,
    description: project.description,
    source: 'project' as const,
    slug: project.href.split('#')[1] || project.title.toLowerCase().replace(/\s+/g, '-'),
    tag: project.tags,
    href: project.href,
    relevance: 0
  })) as ProjectSearchResult[]

  // Combine all content
  const allContent = [...thoughts, ...tils, ...projectItems]

  // Filter and sort results
  const results = allContent
    .map(item => ({
      ...item,
      relevance: calculateRelevance(searchTerm, {
        title: item.title,
        description: item.description,
        tags: item.tag,
        date: 'date' in item ? item.date : undefined
      })
    }))
    .filter(item => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)

  return results
} 