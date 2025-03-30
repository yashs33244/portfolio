import prisma from '@/lib/prisma';
import { BlogPost } from '@/types/blog';
import { cache } from 'react';

/**
 * Get a blog post by slug (server-side)
 * This function is cached to improve performance
 */
export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    // Find the blog post
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        categories: true,
      },
    });

    if (!post) {
      return null;
    }

    return post as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
});

/**
 * Get all blog posts with pagination and filters (server-side)
 * This function is cached to improve performance
 */
export const getBlogPosts = cache(async ({
  page = 1,
  limit = 10,
  category,
  featured,
  published = true,
}: {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  published?: boolean;
} = {}) => {
  try {
    // Create base query
    const where: any = {};

    // Add filters
    if (published !== undefined) {
      where.published = published;
    }

    if (featured) {
      where.featured = true;
    }

    if (category) {
      where.categories = {
        some: {
          slug: category,
        },
      };
    }

    // Get total count for pagination
    const totalPosts = await prisma.post.count({ where });

    // Get posts with pagination
    const posts = await prisma.post.findMany({
      where,
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Log for debugging
    console.log(`Server: Found ${posts.length} posts out of ${totalPosts} total with filters:`, where);

    return {
      posts,
      pagination: {
        total: totalPosts,
        pages: Math.ceil(totalPosts / limit),
        page,
        limit,
      },
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      posts: [],
      pagination: {
        total: 0,
        pages: 0,
        page,
        limit,
      },
    };
  }
});

/**
 * Get all blog categories (server-side)
 * This function is cached to improve performance
 */
export const getBlogCategories = cache(async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    
    return categories;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
}); 