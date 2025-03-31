import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkBlogAdminAuth } from '../middleware';
import { getPostBySlug } from "@/lib/blog";

// GET /api/blog/:slug
export async function GET(
  request: NextRequest,
  context: any
) {
  try {
    // Await the params to resolve the promise
    const params = await context.params;
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
  context: any
) {
  // Check authentication
  const authResponse = checkBlogAdminAuth(request);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  const resolvedParams = await context.params;
  const slug = resolvedParams.slug;

  try {
    const body = await request.json();
    console.log(`Updating blog post with slug: ${slug}`, body);
    
    // Find existing post
    const existingPost = await prisma.post.findUnique({
      where: { slug },
      include: { categories: true },
    });

    if (!existingPost) {
      console.error(`Blog post not found with slug: ${slug}`);
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Handle categories properly
    interface CategoryOperations {
      disconnect?: { id: string }[];
      connect?: { id: string }[];
      create?: { name: string; slug: string }[];
    }
    
    let categoryOperations: CategoryOperations = {};
    
    if (body.categories && Array.isArray(body.categories)) {
      try {
        // Normalize categories to ensure we always have string slugs
        const categorySlugs = body.categories.map((category: any) => 
          typeof category === 'string' ? category : category.slug
        ).filter(Boolean);
        
        console.log("Category slugs:", categorySlugs);
        
        // First, find any existing categories with these slugs
        const existingCategories = await prisma.category.findMany({
          where: {
            slug: {
              in: categorySlugs
            }
          }
        });
        
        console.log("Found existing categories:", existingCategories);
        
        // Map of existing category slugs for quick lookup
        const existingCategoriesBySlugs = existingCategories.reduce((acc, cat) => {
          acc[cat.slug] = cat;
          return acc;
        }, {} as Record<string, any>);
        
        // Prepare connect operations for existing categories
        const connectOperations = existingCategories.map(cat => ({ id: cat.id }));
        
        // Format slug for display in the UI (capitalize first letter, replace hyphens with spaces)
        const formatNameFromSlug = (slug: string) => {
          // Simple formatting: Replace hyphens with spaces and capitalize words
          return slug.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
        };
        
        // Prepare create operations for new categories
        const categoriesToCreate = categorySlugs
          .filter((slug: string) => !existingCategoriesBySlugs[slug])
          .map((slug: string) => {
            // Search for a category with the same formatted name to avoid duplicates
            const formattedName = formatNameFromSlug(slug);
            const existingWithName = Object.values(existingCategoriesBySlugs).find(
              (cat: any) => cat.name.toLowerCase() === formattedName.toLowerCase()
            );
            
            if (existingWithName) {
              // If a category with this name already exists, just use the slug as both name and slug
              return {
                name: slug, // Use the slug as the name too
                slug: slug
              };
            }
            
            // Otherwise create with the formatted name
            return {
              name: formattedName,
              slug: slug
            };
          });
        
        console.log("Categories to create:", categoriesToCreate);
        
        // Use the right approach based on what we found
        categoryOperations = {
          // First disconnect all existing categories
          disconnect: existingPost.categories.map(c => ({ id: c.id })),
          
          // Then connect existing categories we want to keep
          ...(connectOperations.length > 0 ? { connect: connectOperations } : {}),
          
          // And create new ones that don't exist yet
          ...(categoriesToCreate.length > 0 ? { create: categoriesToCreate } : {})
        };
        
        console.log("Category operations:", categoryOperations);
      } catch (error) {
        console.error("Error processing categories:", error);
        // If there's an error with categories, continue without category updates
        categoryOperations = {};
      }
    }

    // Prepare update data
    const updateData: any = {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      coverImage: body.coverImage,
      published: body.published,
      featured: body.featured,
      // Only update slug if provided
      ...(body.slug && body.slug !== slug ? { slug: body.slug } : {}),
      readingTime: body.readingTime,
      // Handle categories if provided and properly processed
      ...(Object.keys(categoryOperations).length > 0 ? { categories: categoryOperations } : {})
    };
    
    // If author is provided, include it
    if (body.author) {
      updateData.author = body.author;
    }
    
    console.log("Final update data:", updateData);

    try {
      // Try to update the post with categories in one operation
      const updatedPost = await prisma.post.update({
        where: { id: existingPost.id },
        data: updateData,
        include: {
          categories: true,
        },
      });
  
      console.log(`Blog post updated successfully: ${updatedPost.title}`);
      return NextResponse.json(updatedPost);
    } catch (error: any) {
      // If the update fails due to a constraint error on categories
      if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
        console.log("Category constraint error, falling back to separate operations");
        
        // Remove categories from update data
        const { categories, ...postOnlyData } = updateData;
        
        // Update the post without touching categories
        const updatedPost = await prisma.post.update({
          where: { id: existingPost.id },
          data: postOnlyData,
          include: {
            categories: true,
          },
        });
        
        console.log("Post updated without categories, now handling categories separately");
        
        try {
          // Type assertion for categoryOperations
          const typedOps = categoryOperations as {
            disconnect?: { id: string }[];
            connect?: { id: string }[];
            create?: { name: string; slug: string }[];
          };
          
          // First disconnect all existing categories
          if (typedOps.disconnect && typedOps.disconnect.length > 0) {
            await prisma.post.update({
              where: { id: existingPost.id },
              data: {
                categories: {
                  disconnect: typedOps.disconnect
                }
              }
            });
          }
          
          // Then connect existing categories
          if (typedOps.connect && typedOps.connect.length > 0) {
            await prisma.post.update({
              where: { id: existingPost.id },
              data: {
                categories: {
                  connect: typedOps.connect
                }
              }
            });
          }
          
          // Finally try to create new categories one by one
          if (typedOps.create && typedOps.create.length > 0) {
            for (const category of typedOps.create) {
              try {
                // Check if category already exists
                const existingCat = await prisma.category.findFirst({
                  where: {
                    OR: [
                      { slug: category.slug },
                      { name: category.name }
                    ]
                  }
                });
                
                if (existingCat) {
                  // Connect to existing category
                  await prisma.post.update({
                    where: { id: existingPost.id },
                    data: {
                      categories: {
                        connect: { id: existingCat.id }
                      }
                    }
                  });
                } else {
                  // Create new category and connect
                  await prisma.category.create({
                    data: {
                      name: category.name,
                      slug: category.slug,
                      posts: {
                        connect: { id: existingPost.id }
                      }
                    }
                  });
                }
              } catch (categoryError) {
                console.error(`Error handling category ${category.name}:`, categoryError);
                // Continue with other categories
              }
            }
          }
          
          // Get the updated post with categories
          const finalPost = await prisma.post.findUnique({
            where: { id: existingPost.id },
            include: { categories: true }
          });
          
          console.log(`Blog post updated successfully with fallback: ${finalPost?.title}`);
          return NextResponse.json(finalPost);
        } catch (fallbackError) {
          console.error("Error in category fallback:", fallbackError);
          // Return the post without updated categories
          return NextResponse.json(updatedPost);
        }
      }
      
      // For other errors, just rethrow
      throw error;
    }
  } catch (error: any) {
    console.error(`Error updating blog post with slug ${slug}:`, error);
    
    // Special handling for Prisma errors
    if (error.code === 'P2002') {
      // Unique constraint violation
      const target = error.meta?.target || [];
      if (target.includes('name')) {
        return NextResponse.json({ 
          error: 'A category with this name already exists',
          details: 'Please try a different category name or reuse an existing one',
          code: error.code
        }, { status: 400 });
      }
    }
    
    return NextResponse.json({ 
      error: 'Failed to update blog post',
      details: error instanceof Error ? error.message : 'Unknown error',
      code: error.code // Include Prisma error code if available
    }, { status: 500 });
  }
}

// DELETE /api/blog/:slug
export async function DELETE(
  request: NextRequest,
  context: any
) {
  // Check authentication
  const authResponse = checkBlogAdminAuth(request);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  try {
    const slug = context.params.slug;
    
    // Find existing post
    const existingPost = await prisma.post.findUnique({
      where: { slug },
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
    console.error(`Error deleting blog post with slug ${context.params.slug}:`, error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
} 