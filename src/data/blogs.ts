export interface Blog {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    tags: string[];
    content: string;
}

export const blogs: Blog[] = [
    {
        id: "1",
        title: "Mastering C and C++",
        description: "my lil thoughts about C and C++",
        image: "/images/blog-1/c.jpg",
        date: "2026-05-06",
        tags: ["Programming"],
        content: `Let's get one thing straight, I don't really remember what I studied for C and C++. So today I will be studying it again and I will be sharing my thoughts about it. (this is my first time writing a blog btw)

Sup chat, I'm back again. I started this a month ago (maybe May 2026 something) and it's currently 6th of June 2026 now and my progress is still zero. So yeah I gotta start because my next school year is near :>

I started to study with the help of one of my trusted friend, Gemini. Anyways, since I've studied C, C++ before I decided to start
understanding Functions and its syntax.

I learned how to use function and call functions inside main, which is kind of hard for me before, but now I realized that it's not that
hard.

`,
    },

    {
        id: "2",
        title: "Downgrade",
        description: "documentation of how my shi will go up",
        image: "/images/blog-2/state.jpg",
        date: "2025-06-22",
        tags: ["Documentation"],
        content: `Damn my life, a lot of things happened in just 1 month. I BROKE my main laptop which I daily drive for schools and other stuffs, kinda mid but good anyway. Idk what to feel honestly..
        
        <b>SPECS:</b>
        Model: Acer Extensa
        Processor: I5-11
        RAM: 16GB DDR4
        STORAGE: 500GB NVME SSD

        But luckily before my main laptop broke, I bought THINKPAD T420. I bought it cause I really want to have an old Thinkpad, plus it's very clean looking, the legendary 7-row keyboard, and the aura is tooo good bro. who doesn't want that?

        <img src="/images/blog-2/thinkpad.jpg" alt="My broken Acer laptop screen" class="blog-inline-img" />
        Damn look at that, it's so hot. Idk if it is just me but I really love the look of old Thinkpads.
        
        <b>SPECS:</b>
        Model: T420
        Processor: i5-2
        RAM: 8GB DDR3
        STORAGE: 220GB SATA SSD

        big downgrade, right?

        <blockquote>"Success is how high you bounce when you hit bottom."
        <small style="opacity: 0.6; font-size: 0.85em; display: block; margin-top: 4px;">— General George S. Patton</small></blockquote>
        This quote really inspires me, because it makes my drive high to do things more. I might be at the bottom right now but I'm willing to grow and climb to the top.

        Honestly, this T420 makes my life productive, maybe because of its appearance? tactile keyboard? its old features that other modern laptops can't do?

        <b>WHAT ARE MY PLANS?</b>
        <b>1. Max out its RAM</b>
        I want to max out my RAM. It's currently 8GB (four 4GB sticks), which makes upgrading difficult since all four slots are full. If I buy an 8GB stick, the total will be 12GB instead of 16GB. If I decide to buy another 8GB stick later, I'll end up with an 8GB and 8GB setup, meaning my old 4GB sticks will go to waste.
        
        <b>2. Upgrade its CPU </b>
        Since the CPU of T420 is not soldered, maybe I will upgrade it to i7-2 but I heard that the heat is not worth it so I'm not sure yet.

        <b>3. Let the technician fix my main laptop </b>
        If I don't have a choice, I will just let the people out there test and fix my main laptop.

        Honestly, I'm laughing at myself cause I be like daily-driving a 2nd-gen i5 in 2026. I know it's a downgrade in specs, but a massive upgrade for myself. I'm realizing that success isn't about having the newest tech, it's about how hard you hustle with what you've got.

`,  
    },
];