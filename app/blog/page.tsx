import { Metadata } from "next";
import { Suspense } from "react";
import { BlogListing } from "@/components/blog-listing";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PenTool, Rss, Search } from "lucide-react";
import prisma from "@/lib/prisma";
import { GridOverlay } from "@/components/ui/grid-overlay";

export const metadata: Metadata = {
  title: "Blog | Tanish Singh",
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
      <div className="min-h-screen bg-figma-dark">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <GridOverlay />

          <div className="figma-container relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-[60px] md:text-[80px] lg:text-[100px] font-bold leading-[0.9] text-white font-poppins mb-6">
                My{" "}
                <span className="text-figma-gradient bg-clip-text text-transparent">
                  Blogs
                </span>
              </h1>

              <p className="text-xl md:text-2xl font-normal leading-[32px] text-white/80 font-poppins mb-12 max-w-[600px] mx-auto">
                Thoughts, ideas, and insights on software development,
                technology, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Listing */}
        <main className="py-16">
          <div className="figma-container">
            <Suspense
              fallback={
                <div className="flex justify-center py-16">
                  <Loader text="Loading articles..." size="lg" />
                </div>
              }
            >
              <BlogListing
                posts={posts}
                pagination={{
                  total: totalPosts,
                  pages: Math.ceil(totalPosts / limit),
                  page,
                  limit,
                }}
              />
            </Suspense>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return (
      <div className="min-h-screen bg-figma-dark">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="figma-container">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-[60px] md:text-[80px] lg:text-[100px] font-bold leading-[0.9] text-white font-poppins mb-6">
                My{" "}
                <span className="text-figma-gradient bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-normal leading-[32px] text-white/80 font-poppins mb-12 max-w-[600px] mx-auto">
                Thoughts, ideas, and insights on software development,
                technology, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Error State */}
        <main className="py-16">
          <div className="figma-container">
            <div className="bg-figma-menu border border-white/10 rounded-lg p-12 text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Error Loading Articles
              </h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Sorry, we couldn't load the blog posts. Please try again later.
              </p>
              <div className="bg-figma-dark rounded-lg p-4 text-left mb-8 max-w-2xl mx-auto">
                <pre className="text-xs text-red-400 overflow-auto">
                  {String(error)}
                </pre>
              </div>
              <Button
                asChild
                className="bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium"
              >
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
