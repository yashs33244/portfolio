import { Metadata } from "next";
import { Suspense } from "react";
import { BlogListing } from "@/components/blog-listing";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog-card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface CategoryPageProps {
  params: any;
  searchParams: Promise<{
    page?: string;
  }>;
}

// Generate metadata for the category page
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.name} | Blog | Yash Singh`,
    description: `Read blog posts about ${category.name} by Yash Singh.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const slug = (await Promise.resolve(params)).slug;

  // Get category
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    notFound();
  }

  // Get posts in this category
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      categories: {
        some: {
          slug,
        },
      },
    },
    include: {
      categories: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Navbar />
      <div className="container py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-6">
            Category: <span className="text-primary">{category.name}</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore all posts in the {category.name} category.
          </p>
        </div>

        {/* List of posts */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No posts found in this category.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
