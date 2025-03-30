"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
