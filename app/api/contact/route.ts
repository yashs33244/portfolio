import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// API endpoint to handle contact form submissions
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Format the message
    const formattedMessage = `
      New Contact Form Submission

      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `;

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password',
      },
    });

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'yashs3324@gmail.com', // Your email
      subject: `Contact Form: ${name}`,
      text: formattedMessage,
      replyTo: email,
    });

    // For development/testing, log to console
    console.log('Contact form submission:', { name, email, message });
    
    // Return success response
    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { message: 'Failed to send message', error: (error as Error).message },
      { status: 500 }
    );
  }
} 