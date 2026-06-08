export interface Blogs {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    tags: string[];
    content: string;
}

export const blogs: Blogs[] = [
    {
        id: "1",
        title: "Mastering C and C++",
        description: "my lil thoughts about C and C++",
        image: "/images/c.jpg",
        date: "2024-05-06",
        tags: ["Programming"],
        content: `
Let's get one thing straight, I don't really remeber what I studied for C and C++. 
So today I will be studying it again and I will be sharing my thoughts about it. (this is my first time writing a blog btw)

Sup chat, I'm back again. I started this a month ago (maybe May 2026 something) and it's currently 6th of June 2026 now and my progress 
is still zero. So yeah I gotta start because my next school year is near :>

I started to study with the help of one of my trusted friend, Gemini. Anyways, since I've studied C, C++ before I decided to start
understanding Functions and its syntax.

Base on our CS121 - Computer Programming 2 (LEC), this is our Module 4.

Plans:
[] Anatomy of a Fast Functions
  [] Pass by Value 
  [] Pass by Reference 
  [] Pass by Constant Reference 

[] Speed Trick: Inline Functions

What are my thoughts about it?

`,
    },
];
