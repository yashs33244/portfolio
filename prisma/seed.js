const { PrismaClient } = require('@prisma/client');

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

  console.log('Database seeded successfully!');
  console.log('Created blog post:', blogPost.title);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 