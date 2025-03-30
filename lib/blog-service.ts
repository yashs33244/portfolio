import { BlogPost } from '@/types/blog';

// Base API URL
const API_URL = '/api/blog';

// Fetch all blog posts with pagination and filters
export async function fetchBlogPosts({
  page = 1,
  limit = 10,
  category,
  featured,
  admin = false,
}: {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  admin?: boolean;
} = {}) {
  const params = new URLSearchParams();
  
  // Add pagination
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  
  // Add filters if provided
  if (category) params.append('category', category);
  if (featured) params.append('featured', 'true');
  if (admin) params.append('admin', 'true');
  
  // Fetch posts
  const response = await fetch(`${API_URL}?${params.toString()}`);
  
  // Handle response
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  
  return response.json();
}

// Fetch a single blog post by slug
export async function fetchBlogPost(slug: string) {
  // Fetch post
  const response = await fetch(`${API_URL}/${slug}`);
  
  // Handle response
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Blog post not found');
    }
    throw new Error('Failed to fetch blog post');
  }
  
  return response.json() as Promise<BlogPost>;
}

// Create a new blog post
export async function createBlogPost(post: Partial<BlogPost>) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create blog post');
  }
  
  return response.json() as Promise<BlogPost>;
}

// Update an existing blog post
export async function updateBlogPost(slug: string, post: Partial<BlogPost>) {
  const response = await fetch(`${API_URL}/${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Blog post not found');
    }
    throw new Error('Failed to update blog post');
  }
  
  return response.json() as Promise<BlogPost>;
}

// Delete a blog post
export async function deleteBlogPost(slug: string) {
  const response = await fetch(`${API_URL}/${slug}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Blog post not found');
    }
    throw new Error('Failed to delete blog post');
  }
  
  return response.json();
}

// Toggle featured status of a blog post
export async function toggleFeaturedPost(post: BlogPost) {
  return updateBlogPost(post.slug, {
    ...post,
    featured: !post.featured,
  });
} 