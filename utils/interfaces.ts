export interface ArticleData {
  title: string
  description: string
  date: string
  tag?: string[]
}

export interface Content {
  type: 'til' | 'thoughts'
  slug: string
  data: ArticleData
  filename: string
  content?: string
}

export interface Project {
  title: string
  description: string
  href: string
  tags?: string[]
}

export interface SearchableContent extends Omit<Content, 'content'> {
  title: string
  description: string
  date?: string
  tag?: string[]
}
