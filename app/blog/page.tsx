import { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BlogListing } from "@/components/blog-listing";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blogs | Yash Singh",
  description:
    "Read the latest articles on software development, tech, and more.",
};

export default async function BlogPage({ searchParams }: any) {
  // In server components, searchParams needs to be awaited according to
  // the error message we received
  const params = await Promise.resolve(searchParams);

  // Extract search parameters
  const page = Number(params.page) || 1;
  const limit = 9; // Posts per page
  const category = params.category;

  // Base query
  const where: any = {
    published: true,
  };

  // Add category filter if provided
  if (category) {
    where.categories = {
      some: {
        slug: category,
      },
    };
  }

  try {
    // Force a small delay to make sure the DB connection is ready
    await new Promise((resolve) => setTimeout(resolve, 300));

    console.log("Fetching blog posts with filters:", where);

    // Get posts with pagination
    const posts = await prisma.post.findMany({
      where,
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Get total count for pagination
    const totalPosts = await prisma.post.count({ where });

    // Log for debugging
    console.log(`Found ${posts.length} posts out of ${totalPosts} total`);

    if (posts.length === 0) {
      console.log(
        "No posts found. Database might be empty or query conditions not matching any posts."
      );
    } else {
      console.log("First post:", posts[0].title, posts[0].published);
    }

    return (
      <>
        <Navbar />
        <main className="container py-12">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Decoding My Thoughts
            </h1>

            <p className="mx-auto max-w-[700px] text-xl text-muted-foreground leading-relaxed">
              Welcome to my digital garden—where insights on software
              development, emerging technologies, and transformative ideas take
              root.
            </p>

            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground mt-4">
              Every day I dive deep into new concepts, experiment with emerging
              tools, and connect disparate ideas. This is where I distill those
              discoveries into something valuable for both of us.
            </p>

            <p className="mx-auto max-w-[700px] text-lg font-medium mt-6">
              No filters. No fluff. Just genuine explorations from the
              frontlines of tech and beyond.
            </p>
          </div>

          <BlogListing
            posts={posts}
            pagination={{
              total: totalPosts,
              pages: Math.ceil(totalPosts / limit),
              page,
              limit,
            }}
          />
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return (
      <>
        <Navbar />
        <main className="container py-12">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Blogs</h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              Thoughts, ideas, and insights on software development, technology,
              and more.
            </p>
          </div>
          <div className="rounded-lg border p-8 text-center">
            <h2 className="text-lg font-medium text-destructive">
              Error loading blog posts
            </h2>
            <p className="text-muted-foreground mt-2">
              Sorry, we couldn't load the blog posts. Please try again later.
            </p>
            <pre className="mt-4 text-xs text-left bg-gray-100 p-4 rounded overflow-auto">
              {String(error)}
            </pre>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
