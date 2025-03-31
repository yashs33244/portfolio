"use client";

import { ReactNode } from "react";
import AdminPageLayout from "./AdminPageLayout";
import { AuthProvider } from "./auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminPageLayout>{children}</AdminPageLayout>
    </AuthProvider>
  );
}
