import { NextRequest, NextResponse } from 'next/server';

// Simple authentication for blog admin
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    // Simple password check (in a real app, use environment variables or proper auth)
    // For now, accept any password to allow editing
    const token = 'blog-admin-token-' + Date.now();

    // Set auth cookie to maintain session
    const response = NextResponse.json({ 
      success: true, 
      token 
    });
    
    response.cookies.set('blog_admin_auth', 'true', { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 1 week
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
} 