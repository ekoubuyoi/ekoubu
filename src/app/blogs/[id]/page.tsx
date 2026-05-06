import Link from "next/link";
import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = blogs.find((b) => b.id === id);

    if (!blog) {
        notFound();
    }

    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col bg-white px-6 sm:px-10 md:px-10 pt-10 sm:pt-24 md:pt-20 pb-6 sm:pb-8 dark:bg-black min-h-screen">
            <div className="flex flex-col">
                <Link href="/blogs" className="group mb-6 underline decoration-2 underline-offset-6 flex items-center text-sm font-bold text-black dark:text-white hover:opacity-70 transition-opacity w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 transition-transform group-hover:-translate-x-1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Back to Blogs
                </Link>

                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-bold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border-2 border-black dark:border-white">
                        {new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    {blog.tags.map((tag) => (
                        <span key={tag} className="text-xs font-bold px-3 py-1 bg-yellow-300 dark:bg-yellow-500 text-black border-2 border-black">
                            #{tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
                    {blog.title}
                </h1>

                {blog.image && (
                    <div className="border-[3px] border-black dark:border-white rounded-xl overflow-hidden mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                        <img src={blog.image} alt={blog.title} className="w-full h-80 object-cover" />
                    </div>
                )}

                <div className="prose-custom">
                    <Markdown
                        components={{
                            h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 border-b-4 border-black dark:border-white pb-2">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4 bg-black text-white dark:bg-white dark:text-black px-4 py-1 inline-block">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-xl font-bold mt-8 mb-3 underline decoration-4 underline-offset-4">{children}</h3>,
                            p: ({ children }) => <p className="text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed mb-6">{children}</p>,
                            ul: ({ children }) => <ul className="list-none space-y-2 mb-6 ml-4">{children}</ul>,
                            li: ({ children }) => (
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1.5 h-3 w-3 border-2 border-black dark:border-white bg-black dark:bg-yellow-500 shrink-0" />
                                    <span className="text-lg text-zinc-800 dark:text-zinc-200">{children}</span>
                                </li>
                            ),
                            code: ({ children }) => (
                                <code className="bg-zinc-100 dark:bg-zinc-800 border-2 border-black dark:border-white px-2 py-0.5 rounded font-mono text-sm font-bold">
                                    {children}
                                </code>
                            ),
                            pre: ({ children }) => (
                                <pre className="bg-zinc-900 text-zinc-100 p-6 border-[3px] border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] rounded-xl overflow-x-auto mb-8 font-mono text-sm">
                                    {children}
                                </pre>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-8 border-black dark:border-white bg-zinc-50 dark:bg-zinc-900 p-6 italic text-xl text-zinc-700 dark:text-zinc-300 mb-8 shadow-inner">
                                    {children}
                                </blockquote>
                            ),
                            img: ({ src, alt }) => (
                                <img
                                    src={src}
                                    alt={alt}
                                    className="w-full h-90 border-[3px] border-black dark:border-white rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] my-10"
                                />
                            ),
                            a: ({ href, children }) => (
                                <a href={href} className="font-bold underline decoration-yellow-400 decoration-4 underline-offset-2 hover:bg-yellow-400 hover:text-black transition-colors">
                                    {children}
                                </a>
                            ),
                        }}
                    >
                        {blog.content}
                    </Markdown>
                </div>
            </div>
        </main>
    );
}
