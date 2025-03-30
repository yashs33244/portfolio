import { Metadata } from "next";
import { Suspense } from "react";
import { BlogListing } from "@/components/blog-listing";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    slug: string;
  };
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
    title: `${category.name} | Blog | Tanish Singh`,
    description: `Read blog posts about ${category.name} by Tanish Singh.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const slug = params.slug;
  // Await the searchParams before accessing its properties
  const searchParamsData = await searchParams;
  const page = Number(searchParamsData.page) || 1;
  const limit = 9; // Posts per page

  // Check if category exists
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    notFound();
  }

  // Get posts with pagination
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
    skip: (page - 1) * limit,
    take: limit,
  });

  // Get total count for pagination
  const totalPosts = await prisma.post.count({
    where: {
      published: true,
      categories: {
        some: {
          slug,
        },
      },
    },
  });

  return (
    <main className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          {category.name}
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Browse blog posts categorized under {category.name}.
        </p>
      </div>

      <Suspense fallback={<div>Loading posts...</div>}>
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
    </main>
  );
}
