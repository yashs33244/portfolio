import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkBlogAdminAuth } from './middleware';

// GET /api/blog
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const featured = searchParams.get('featured') === 'true';
  const category = searchParams.get('category');
  const isAdmin = searchParams.get('admin') === 'true';

  // Create base query
  const where: any = {
    // Only filter for published if not in admin mode
    ...(isAdmin ? {} : { published: true }),
  };

  // Add optional filters
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

  try {
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

    return NextResponse.json({
      posts,
      pagination: {
        total: totalPosts,
        pages: Math.ceil(totalPosts / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

// POST /api/blog
export async function POST(req: NextRequest) {
  // Check authentication
  const authResponse = checkBlogAdminAuth(req);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  try {
    const body = await req.json();
    
    // Handle categories properly
    let categoryOperations = {};
    if (body.categories && Array.isArray(body.categories)) {
      // Normalize categories to ensure we always have string slugs
      const categorySlugs = body.categories.map((category: any) => 
        typeof category === 'string' ? category : category.slug
      ).filter(Boolean);
      
      // Create a connectOrCreate operation for each category
      categoryOperations = {
        connectOrCreate: categorySlugs.map((slug: string) => ({
          where: { slug },
          create: {
            name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
            slug,
          },
        })),
      };
    }
    
    // Create new blog post
    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        coverImage: body.coverImage,
        published: body.published || false,
        featured: body.featured || false,
        author: body.author || 'Yash Singh',
        readingTime: body.readingTime,
        // Add categories if provided
        ...(body.categories ? { categories: categoryOperations } : {}),
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
} 