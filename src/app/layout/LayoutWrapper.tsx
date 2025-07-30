"use client";

import { usePathname } from "next/navigation";
import AppLayout from "./AppLayout";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.includes("/sign");

  return isAuthPage ? <>{children}</> : <AppLayout>{children}</AppLayout>;
}
