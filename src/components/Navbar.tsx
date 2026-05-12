"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
  },
  {
    name: "Projects",
    path: "/projects",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" />
  },
  {
    name: "Blogs",
    path: "/blogs",
    icon: <path strokeLinecap="round" strokeWidth="2" d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2" />
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Top Navbar (Desktop + Mobile Brand) */}
      <nav className="hidden md:block sticky top-10 z-50 w-full bg-white px-4 py-4 transition-all 
        border-[3px] border-black rounded-xl mx-auto max-w-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-black">
              <Image
                src="/images/pfp.jpg"
                alt="Logo"
                fill
                sizes="32px"
                className="grayscale object-cover"
              />
            </div>
            <span className="font-bold">
              ekoubuyoi
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`font-ubuntu text-sm font-medium transition-colors hover:text-zinc-900 ${pathname === item.path ? "text-zinc-900" : "text-zinc-500"
                  }`}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="block h-0.5 w-full bg-zinc-900" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t-[4px] border-black">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-100 group transition-colors"
            >
              <svg
                className={`w-6 h-6 mb-1 transition-colors ${pathname === item.path ? "text-black" : "text-zinc-400"
                  } group-hover:text-black`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                {item.icon}
              </svg>
              <span className={`text-[10px] uppercase tracking-wider transition-colors ${pathname === item.path ? "text-black font-bold" : "text-zinc-500"
                } group-hover:text-black`}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}