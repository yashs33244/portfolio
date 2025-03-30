import { NextRequest, NextResponse } from 'next/server';

// Check authentication for blog admin API operations
export function checkBlogAdminAuth(req: NextRequest) {
  // Get the auth cookie
  const authCookie = req.cookies.get('blog_admin_auth');
  
  // For GET requests, allow public access
  if (req.method === 'GET') {
    return NextResponse.next();
  }
  
  // For all other methods (POST, PUT, DELETE), check authentication
  if (!authCookie || authCookie.value !== 'true') {
    return NextResponse.json(
      { error: 'Unauthorized access. Please login first.' },
      { status: 401 }
    );
  }
  
  // Authenticated, allow the request to proceed
  return NextResponse.next();
} 