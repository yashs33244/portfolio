export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo?: string
  featured?: boolean
}

export interface Experience {
  id: number
  role: string
  company: string
  startDate: string
  endDate: string
  description: string
  responsibilities: string[]
  technologies: string[]
}

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage?: string
  readingTime: number
  tags: string[]
}

