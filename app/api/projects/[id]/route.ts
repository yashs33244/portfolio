import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkProjectAdminAuth } from '../middleware';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/projects/[id]
export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

// PUT /api/projects/[id]
export async function PUT(req: NextRequest, { params }: RouteParams) {
  // Check authentication
  const authResponse = checkProjectAdminAuth(req);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  const { id } = await params;

  try {
    const body = await req.json();
    
    // Update project
    const project = await prisma.project.update({
      where: { id },
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

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE /api/projects/[id]
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  // Check authentication
  const authResponse = checkProjectAdminAuth(req);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  const { id } = await params;

  try {
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
} 