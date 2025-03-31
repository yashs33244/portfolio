import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkBlogAdminAuth } from '../middleware';
import { getPostBySlug } from "@/lib/blog";

// GET /api/blog/:slug
export async function GET(
  request: NextRequest,
  { params }: any
) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/blog/:slug
export async function PUT(
  request: NextRequest,
  { params }: any
) {
  // Check authentication
  const authResponse = checkBlogAdminAuth(request);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  try {
    const body = await request.json();
    
    // Find existing post
    const existingPost = await prisma.post.findUnique({
      where: { slug: params.slug },
      include: { categories: true },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Handle categories properly
    let categoryOperations = {};
    if (body.categories && Array.isArray(body.categories)) {
      // First, find any existing categories with these slugs
      const existingCategories = await prisma.category.findMany({
        where: {
          slug: {
            in: body.categories
          }
        }
      });
      
      // Map of existing category slugs for quick lookup
      const existingCategoriesBySlugs = existingCategories.reduce((acc, cat) => {
        acc[cat.slug] = cat;
        return acc;
      }, {} as Record<string, any>);
      
      // Prepare connect operations for existing categories
      const connectOperations = existingCategories.map(cat => ({ id: cat.id }));
      
      // Prepare create operations for new categories
      const categoriesToCreate = body.categories.filter(
        (slug: string) => !existingCategoriesBySlugs[slug]
      ).map((slug: string) => ({
        name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
        slug: slug
      }));
      
      // Use the right approach based on what we found
      categoryOperations = {
        // First disconnect all existing categories
        disconnect: existingPost.categories.map(c => ({ id: c.id })),
        
        // Then connect existing categories we want to keep
        connect: connectOperations,
        
        // And create new ones that don't exist yet
        create: categoriesToCreate
      };
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: existingPost.id },
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        coverImage: body.coverImage,
        published: body.published,
        featured: body.featured,
        // Only update slug if provided
        ...(body.slug && body.slug !== params.slug ? { slug: body.slug } : {}),
        author: body.author,
        readingTime: body.readingTime,
        // Handle categories if provided
        ...(body.categories ? { categories: categoryOperations } : {}),
      },
      include: {
        categories: true,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(`Error updating blog post with slug ${params.slug}:`, error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

// DELETE /api/blog/:slug
export async function DELETE(
  request: NextRequest,
  { params }: any
) {
  // Check authentication
  const authResponse = checkBlogAdminAuth(request);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  try {
    // Find existing post
    const existingPost = await prisma.post.findUnique({
      where: { slug: params.slug },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: existingPost.id },
    });

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(`Error deleting blog post with slug ${params.slug}:`, error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
} 