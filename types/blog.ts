import { Category } from "@prisma/client";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  featured: boolean;
  author: string;
  views: number;
  readingTime: number | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  categories: Category[];
  className?: string;
}

export interface BlogListingProps {
  posts: BlogPost[];
  pagination?: {
    total: number;
    pages: number;
    page: number;
    limit: number;
  };
}

export interface BlogCardProps {
  post: BlogPost;
}

export interface BlogFilterProps {
  categories: Category[];
  selectedCategory?: string;
}

export interface BlogCoverUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export interface BlogHeroProps {
  post: BlogPost;
} 