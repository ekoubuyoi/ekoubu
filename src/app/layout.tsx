import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "ekoubuyoi",
  description: "minimalist portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable} h-full antialiased`}
    >
      <body className="border-t-[4px] border-black min-h-full flex flex-col bg-zinc-50">
        <Navbar />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
