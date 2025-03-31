"use client";

import React, { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface AdminPageLayoutProps {
  children: ReactNode;
}

export default function AdminPageLayout({ children }: AdminPageLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
