import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Home } from "lucide-react";

interface BlogLayoutProps {
  children: ReactNode;
}

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Blog header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              <span className="font-semibold">Home</span>
            </Link>
            <Link href="/blog" className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="font-semibold">Blog</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/blog/admin">Admin</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Tanish Singh. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
