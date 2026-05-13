"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Briefcase, BookText } from "lucide-react"; // Import the icons

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: Home, // Just pass the component reference
  },
  {
    name: "Projects",
    path: "/projects",
    icon: Briefcase,
  },
  {
    name: "Blogs",
    path: "/blogs",
    icon: BookText,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Top Navbar (Desktop) */}
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
            <span className="font-bold">ekoubuyoi</span>
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
      <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t-[3px] border-black">
        <div className="flex h-full items-center justify-center gap-12 font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                // justify-center on the link keeps icon and text aligned
                className="flex flex-col items-center justify-center group transition-colors min-w-[60px]"
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-colors ${isActive ? "text-black" : "text-zinc-400"
                    } group-hover:text-black`}
                />
                <span
                  className={`text-[10px] mt-1 uppercase tracking-wider transition-colors ${isActive ? "text-black font-bold" : "text-zinc-500"
                    } group-hover:text-black`}
                >
                  {item.name}
                </span>

                {/* Optional: Indicator dot for active state to add extra "balance" */}
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-black rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}