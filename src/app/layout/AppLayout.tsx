// layout/components/AppLayout.tsx
"use client";

import { ReactNode } from "react";
import { Header } from "./components/Header";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
