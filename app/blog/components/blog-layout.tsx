import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Home } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface BlogLayoutProps {
  children: ReactNode;
}

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Use the common Navbar component */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Use the common Footer component */}
      <Footer />
    </div>
  );
}
