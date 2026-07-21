import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-zinc-900 py-8 border-t dark:border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        
        {/* Brand Info */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-blue-600">CrowdFund</h2>
          <p className="text-sm text-gray-500 mt-1 max-w-sm">
            Empowering ideas and shaping the future through community-driven funding.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
          <Link href="/about" className="hover:text-blue-600 transition">About Us</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
          <Link href="/terms" className="hover:text-blue-600 transition">Terms of Service</Link>
        </div>

      </div>
      
      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-8 border-t dark:border-zinc-800 pt-4 max-w-7xl mx-auto px-4">
        &copy; {new Date().getFullYear()} CrowdFund Platform. All rights reserved.
      </div>
    </footer>
  );
}