import { NextRequest, NextResponse } from 'next/server';

// Check authentication for projects admin API operations
export function checkProjectAdminAuth(req: NextRequest) {
  // Get the auth cookie
  const authCookie = req.cookies.get('project-admin-auth');
  
  // For GET requests, allow public access
  if (req.method === 'GET') {
    return NextResponse.next();
  }
  
  // For all other methods (POST, PUT, DELETE), check authentication
  if (!authCookie || authCookie.value !== 'authenticated') {
    return NextResponse.json(
      { error: 'Unauthorized access. Please login first.' },
      { status: 401 }
    );
  }
  
  // Authenticated, allow the request to proceed
  return NextResponse.json({ success: true }, { status: 200 });
} 