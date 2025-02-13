export interface ArticleData {
  title: string
  description: string
  date: string
  tag?: string[]
}

export interface Content {
  data: ArticleData
  content?: string
  slug: string
  type: 'thoughts' | 'til'
}

export interface Project {
  title: string
  description: string
  href: string
  tags?: string[]
}
