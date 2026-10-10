export interface ArticleData {
  title: string
  description: string
  date: string
  tag: string[]
  readingTime?: {
    minutes: number
    words: number
    text: string
  }
}

export type ContentType = 'til' | 'thoughts'

export interface Content {
  type: ContentType
  slug: string
  data: ArticleData
}

export interface Project {
  title: string
  description: string
  href: string
  tags?: string[]
  featured?: boolean
}
