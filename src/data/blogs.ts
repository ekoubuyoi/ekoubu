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



`,
    },
];