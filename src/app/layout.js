import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crowdfunding Platform",
  description: "Raise money for projects, causes, and products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black dark:text-white"
        suppressHydrationWarning={true} // <-- ঠিক এই লাইনটি <body> ট্যাগের ভেতরে দিতে হবে
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}