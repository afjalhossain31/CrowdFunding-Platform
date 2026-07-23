import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-dark-primary py-8 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">CrowdFund</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
            Empowering ideas and shaping the future through community-driven funding.
          </p>
        </div>

        {/* Quick Links - Centered */}
        <div className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 items-center md:items-start">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Quick Links</h3>
          <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About Us</Link>
          <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact</Link>
          <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Terms of Service</Link>
        </div>

        {/* Social Media Links - Right Aligned */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Follow Us</h3>
          <div className="flex gap-5 text-2xl text-slate-500 dark:text-slate-400">
            <a href="https://github.com/afjalhossain31" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              <FaLinkedin />
            </a>
            <a href="https://www.facebook.com/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              <FaFacebook />
            </a>
          </div>
        </div>

      </div>
      
      {/* Copyright */}
      <div className="text-center text-slate-500 dark:text-slate-400 text-sm mt-8 border-t border-slate-200 dark:border-slate-800 pt-4 max-w-7xl mx-auto px-4">
        &copy; {new Date().getFullYear()} CrowdFund Platform. All rights reserved.
      </div>
    </footer>
  );
}