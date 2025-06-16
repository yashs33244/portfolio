import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkProjectAdminAuth } from './middleware';

// GET /api/projects
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const featured = searchParams.get('featured') === 'true';
  const isAdmin = searchParams.get('admin') === 'true';

  // Check admin authentication for admin requests
  if (isAdmin) {
    const authCookie = req.cookies.get('project-admin-auth');
    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Create base query
  const where: any = {
    // Only filter for published if not in admin mode
    ...(isAdmin ? {} : { published: true }),
  };

  // Add optional filters
  if (featured) {
    where.featured = true;
  }

  try {
    // Get total count for pagination
    const totalProjects = await prisma.project.count({ where });
    
    // Get projects with pagination
    const projects = await prisma.project.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      projects,
      pagination: {
        total: totalProjects,
        pages: Math.ceil(totalProjects / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST /api/projects
export async function POST(req: NextRequest) {
  // Check authentication
  const authResponse = checkProjectAdminAuth(req);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  try {
    const body = await req.json();
    
    // Create new project
    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        coverImage: body.coverImage,
        liveLink: body.liveLink,
        githubLink: body.githubLink,
        demoLink: body.demoLink,
        technologies: body.technologies || [],
        published: body.published || false,
        featured: body.featured || false,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
} 