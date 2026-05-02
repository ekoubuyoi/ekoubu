import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-22 dark:bg-black sm:items-start">

      {/* pfp and text info */}
      <div className="flex items-center gap-5">
        
        {/* pfp */}
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden border-3 dark:border-gray-800 rounded-full grayscale">
          <Image
            src="/images/pfp.jpg"
            alt="Logo"
            fill
            className="object-cover"
          />
        </div>

        {/* texts */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Ekoubuyoi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Developer
          </p>
        </div>
      </div>

      {/* other stuffs/info */}
      <div className="py-8">
        <h1> Hi! I'</h1>
      </div>

    </main>
  );
}