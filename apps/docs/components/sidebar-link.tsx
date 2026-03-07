"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`menu-btn menu-btn-sm ${pathname === href ? "active" : ""}`}
    >
      {children}
    </Link>
  );
}
