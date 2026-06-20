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

I learned how to use function and call functions inside main, which is kind of hard for me before, but now I realized that it's not that 
hard.
`,
    },
];
