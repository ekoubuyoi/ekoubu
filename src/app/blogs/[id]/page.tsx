"use client";

import { useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function BlogDetailPage({ params }: PageProps) {
    const { id } = use(params);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Find the specific blog post matching the dynamic URL ID
    const blog = blogs.find((b) => b.id === id);

    // Guard clause: Sends user to the default Next.js 404 page if ID is invalid
    if (!blog) {
        notFound();
    }

    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col bg-white px-4 sm:px-10 md:px-10 pt-6 sm:pt-24 md:pt-20 pb-6 min-h-screen">
            <div className="flex flex-col w-full">
                {/* Back to Blog List Link */}
                <Link href="/blogs" className="group mb-5 underline decoration-2 underline-offset-6 flex items-center text-sm font-bold text-black hover:opacity-70 transition-opacity w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 transition-transform group-hover:-translate-x-1">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Blogs
                </Link>

                {/* Main Article Window */}
                <article className="w-full mb-2 min-w-0">

                    {/* Meta Info (Tags & Dates) */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs font-bold px-2 py-1 bg-zinc-100 border-2 border-black whitespace-nowrap">
                            {new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </span>
                        {blog.tags.map((tag) => (
                            <span key={tag} className="text-xs font-bold px-2 py-1 bg-yellow-300 text-black border-2 border-black whitespace-nowrap">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Blog Title */}
                    <h1 className="text-xl sm:text-4xl font-bold text-black leading-tight mb-2 break-words">
                        {blog.title}
                    </h1>

                    {/* Blog Short Description */}
                    <p className="text-sm sm:text-base text-zinc-500 italic mb-6 border-b-[3px] border-black pb-4 break-words">
                        {blog.description}
                    </p>

                    {/* Blog Header Image */}
                    {blog.image && (
                        <div className="relative w-full h-44 sm:h-64 md:h-80 mb-6 overflow-hidden rounded-xl border-[3px] border-black">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 768px"
                            />
                        </div>
                    )}

                    {/* Actual Blog Content Render Block */}
                    <div
                        className="whitespace-pre-line text-sm sm:text-md font-md leading-relaxed tracking-wide antialiased pb-6 border-b-[3px] border-black break-words overflow-x-hidden
                        [&_blockquote]:border-l-[4px] [&_blockquote]:border-black [&_blockquote]:pl-3 sm:[&_blockquote]:pl-4 [&_blockquote]:my-1 [&_blockquote]:italic [&_blockquote]:font-bold [&_blockquote]:text-sm sm:[&_blockquote]:text-base
                        
                        [&_.blog-inline-img]:w-full 
                        [&_.blog-inline-img]:h-full
                        sm:[&_.blog-inline-img]:h-full
                        md:[&_.blog-inline-img]:h-full
                        [&_.blog-inline-img]:object-cover 
                        [&_.blog-inline-img]:overflow-hidden 
                        [&_.blog-inline-img]:rounded-xl 
                        [&_.blog-inline-img]:border-[3px] 
                        [&_.blog-inline-img]:border-black"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Footer Section */}
                    <footer className="mt-1 mb-13 sm:mb-0 pt-2 flex flex-row items-center justify-between gap-4 w-full">
                        <div className="flex flex-col gap-1 text-left">
                            <h4 className="font-bold text-black text-sm sm:text-base">Thanks for reading!</h4>
                            <p className="text-xs text-zinc-500">built with next.js + tailwind</p>
                        </div>
                        
                        <div className="flex items-center justify-center gap-3 w-auto">
                            <a 
                                href="https://github.com/ekoubuyoi" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs font-bold px-3 py-1.5 bg-yellow-300 text-black border-2 border-black rounded-md shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center whitespace-nowrap"
                            >
                                Github
                            </a>
                        </div>
                    </footer>

                </article>
            </div>
        </main>
    );
}