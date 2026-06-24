"use client";

import { useEffect } from "react";
import Link from "next/link";
import { blogs } from "@/data/blogs";

export default function BlogsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col bg-white px-6 sm:px-10 md:px-10 pt-6 sm:pt-24 md:pt-20 pb-22 sm:pb-8 min-h-screen">
            <div className="flex flex-col">
                <Link href="/" className="group mb-6 underline decoration-2 underline-offset-6 flex items-center text-sm font-bold text-black hover:opacity-70 transition-opacity w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 transition-transform group-hover:-translate-x-1">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back
                </Link>
                <h1 className="text-xl sm:text-3xl font-bold text-black">
                    Blogs
                </h1>
                <p className="mt-1 text-base sm:text-lg text-gray-600">
                    just some things I wrote
                </p>

                {/* blogs list */}
                <div className="py-6 w-full flex flex-col gap-6">
                    {blogs.length > 0 ? (
                        [...blogs].reverse().map((blog) => (
                                <Link
                                key={blog.id}
                                href={`/blogs/${blog.id}`}
                                className="block border-[3px] border-black p-6 rounded-xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs font-bold px-2 py-1 bg-zinc-100 border-2 border-black">
                                            {new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                        </span>
                                        {blog.tags.map((tag) => (
                                            <span key={tag} className="text-xs font-bold px-2 py-1 bg-yellow-300 text-black border-2 border-black">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-bold underline underline-offset-4 decoration-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-sm text-zinc-600 leading-relaxed">
                                        {blog.description}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="border-[3px] border-dashed border-zinc-400 p-6 rounded-xl text-center text-zinc-500">
                            No blogs found. Check back later!
                        </div>
                    )}
                </div>
            </div>
        </main >
    );
}