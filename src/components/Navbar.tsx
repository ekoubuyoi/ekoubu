"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-10 z-50 mx-auto w-full max-w-3xl border-b border-zinc-200/50 bg-white/70 backdrop-blur-md px-16 py-4 dark:border-zinc-800/50 dark:bg-black/70">
      <div className="flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg">
            <Image
              src="/images/logo2.png"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
          <span>
            ekoubuyoi
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`font-ubuntu text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 ${pathname === item.path
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 dark:text-zinc-400"
                }`}
            >
              {item.name}
              {pathname === item.path && (
                <span className="block h-0.5 w-full bg-zinc-900 dark:bg-zinc-100" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
