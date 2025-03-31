import { NextRequest, NextResponse } from 'next/server';

// Check authentication for blog admin API operations
export function checkBlogAdminAuth(req: NextRequest) {
  // For GET requests, allow public access
  if (req.method === 'GET') {
    return NextResponse.next();
  }
  
  // For all POST/PUT/DELETE operations, allow access without authentication for now
  return NextResponse.next();
} 