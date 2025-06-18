import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_CREDENTIALS = {
  email: 'yashs3324@gmail.com',
  password: 'Ironman@123#'
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    // Check credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Set authentication cookie
      const response = NextResponse.json({ success: true, message: 'Logged in successfully' });
      response.cookies.set('project_admin_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: '/'
      });
      
      return response;
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  // Logout - clear the cookie
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.set('project_admin_auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    path: '/'
  });
  
  return response;
} 