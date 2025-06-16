import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create test categories
  const categoryTech = await prisma.category.upsert({
    where: { slug: 'technology' },
    update: {},
    create: {
      name: 'Technology',
      slug: 'technology',
    },
  });

  const categoryWeb = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: {
      name: 'Web Development',
      slug: 'web-development',
    },
  });

  // Create a test blog post
  const blogPost = await prisma.post.upsert({
    where: { slug: 'getting-started-with-nextjs' },
    update: {},
    create: {
      title: 'Getting Started with Next.js',
      slug: 'getting-started-with-nextjs',
      content: `# Getting Started with Next.js

Next.js is a powerful React framework that enables server-side rendering, static site generation, and more.

## Why Choose Next.js?

- **Server-side rendering** - Improved SEO and performance
- **Static site generation** - Blazing fast websites
- **File-based routing** - Intuitive navigation structure
- **API routes** - Backend functionality without separate server

## Code Example

\`\`\`jsx
// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Welcome to my website!</h1>
      <p>Built with Next.js</p>
    </div>
  )
}
\`\`\`

## Diagrams with Mermaid

Here's how the Next.js rendering process works:

\`\`\`mermaid
graph TD
    A[Request] --> B[Next.js Server]
    B --> C{Rendering Method}
    C -->|SSR| D[Server-Side Rendered]
    C -->|SSG| E[Static Generated]
    C -->|ISR| F[Incremental Static Regeneration]
    D --> G[HTML Response]
    E --> G
    F --> G
\`\`\`

Thanks for reading!
`,
      excerpt: 'Learn how to get started with Next.js, a powerful React framework for building modern web applications.',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      published: true,
      featured: true,
      author: 'Tanish Singh',
      readingTime: 5,
      views: 0,
      categories: {
        connect: [
          { id: categoryTech.id },
          { id: categoryWeb.id },
        ],
      },
    },
  });

  // Create test projects
  const project1 = await prisma.project.upsert({
    where: { slug: 'e-commerce-platform' },
    update: {},
    create: {
      title: 'Modern E-Commerce Platform',
      slug: 'e-commerce-platform',
      description: 'A full-stack e-commerce platform built with Next.js, TypeScript, and Prisma. Features include user authentication, product management, shopping cart, payment integration with Stripe, order tracking, and admin dashboard. The platform is fully responsive and optimized for performance.',
      coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
      liveLink: 'https://ecommerce-demo.vercel.app',
      githubLink: 'https://github.com/yashs33244/ecommerce-platform',
      demoLink: 'https://www.youtube.com/watch?v=demo1',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'NextAuth.js'],
      featured: true,
      published: true,
    },
  });

  const project2 = await prisma.project.upsert({
    where: { slug: 'task-management-app' },
    update: {},
    create: {
      title: 'AI-Powered Task Management',
      slug: 'task-management-app',
      description: 'An intelligent task management application with AI-powered priority suggestions, natural language processing for task creation, team collaboration features, and real-time notifications. Built with React, Node.js, and integrated with OpenAI API.',
      coverImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71',
      liveLink: 'https://taskmaster-ai.vercel.app',
      githubLink: 'https://github.com/yashs33244/task-management-ai',
      demoLink: 'https://www.youtube.com/watch?v=demo2',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API', 'Socket.io', 'Material-UI'],
      featured: true,
      published: true,
    },
  });

  const project3 = await prisma.project.upsert({
    where: { slug: 'portfolio-website' },
    update: {},
    create: {
      title: 'Personal Portfolio Website',
      slug: 'portfolio-website',
      description: 'A modern, responsive portfolio website showcasing my projects and skills. Built with Next.js 14, TypeScript, and Tailwind CSS. Features include dark mode, smooth animations, blog functionality, and contact form integration.',
      coverImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d',
      liveLink: 'https://itsyash.vercel.app',
      githubLink: 'https://github.com/yashs33244/portfolio',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'MDX'],
      featured: false,
      published: true,
    },
  });

  const project4 = await prisma.project.upsert({
    where: { slug: 'data-visualization-dashboard' },
    update: {},
    create: {
      title: 'Data Visualization Dashboard',
      slug: 'data-visualization-dashboard',
      description: 'An interactive data visualization dashboard for analyzing business metrics and KPIs. Built with React, D3.js, and Python backend. Features include real-time data updates, custom chart types, filtering capabilities, and export functionality.',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      githubLink: 'https://github.com/yashs33244/data-viz-dashboard',
      demoLink: 'https://www.youtube.com/watch?v=demo4',
      technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL', 'Chart.js'],
      featured: false,
      published: true,
    },
  });

  const project5 = await prisma.project.upsert({
    where: { slug: 'ml-model-deployment' },
    update: {},
    create: {
      title: 'ML Model Deployment Platform',
      slug: 'ml-model-deployment',
      description: 'A platform for deploying and managing machine learning models with automatic scaling, monitoring, and A/B testing capabilities. Built with FastAPI, Docker, Kubernetes, and integrated with MLflow for model versioning.',
      coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
      githubLink: 'https://github.com/yashs33244/ml-deployment-platform',
      technologies: ['Python', 'FastAPI', 'Docker', 'Kubernetes', 'MLflow', 'Redis', 'Prometheus'],
      featured: false,
      published: true,
    },
  });

  console.log('Database seeded successfully!');
  console.log('Created blog post:', blogPost.title);
  console.log('Created projects:', [project1.title, project2.title, project3.title, project4.title, project5.title]);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 