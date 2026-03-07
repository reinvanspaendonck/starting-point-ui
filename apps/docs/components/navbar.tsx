import Link from "next/link";
import { Github } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40">
      <div className="px-4 sm:px-6 h-(--navbar-height)">
        <nav className="h-full flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-1 -mr-2">
            <Link
              href="/docs/guides/introduction"
              className="btn btn-ghost btn-sm"
            >
              Docs
            </Link>
            <a
              href="https://github.com/gufodotdev/starting-point-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-icon-sm"
            >
              <Github />
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
