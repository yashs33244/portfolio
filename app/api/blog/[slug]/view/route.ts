import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/blog/:slug/view
export async function POST(
  req: NextRequest,
  { params }: any
) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  try {
    // Find the post
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Increment view count
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ message: 'View count incremented successfully' });
  } catch (error) {
    console.error(`Error incrementing view count for post with slug ${slug}:`, error);
    return NextResponse.json({ error: 'Failed to increment view count' }, { status: 500 });
  }
} 