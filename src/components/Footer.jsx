"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#212b36] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-5 gap-10 pb-16 border-b border-slate-700/60">
        
        {/* Newsletter Column */}
        <div className="md:col-span-2">
          <h3 className="text-white font-bold text-lg mb-4">Newsletter</h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Join us in our mission! Subscribe to our weekly email campaigns to stay updated with new projects.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 max-w-md">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white text-zinc-900 px-4 py-3 rounded text-sm focus:outline-none w-full"
            />
            <button 
              type="submit" 
              className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold px-6 py-3 rounded text-sm uppercase tracking-wider transition shadow-sm shrink-0"
            >
              Sign up
            </button>
          </form>
        </div>

        {/* Get Started Column */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Get Started</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/news" className="hover:text-amber-400 transition">News</Link></li>
            <li><Link href="/explore-campaigns" className="hover:text-amber-400 transition">Explore</Link></li>
            <li><Link href="/faqs" className="hover:text-amber-400 transition">FAQs</Link></li>
            <li><Link href="/about" className="hover:text-amber-400 transition">About</Link></li>
            <li><Link href="/cart" className="hover:text-amber-400 transition">Shopping Cart</Link></li>
          </ul>
        </div>

        {/* Dashboard Column */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Dashboard</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/dashboard" className="hover:text-amber-400 transition">Dashboard</Link></li>
            <li><Link href="/login" className="hover:text-amber-400 transition">Login</Link></li>
            <li><Link href="/register" className="hover:text-amber-400 transition">Register</Link></li>
            <li><Link href="/dashboard/add-campaign" className="hover:text-amber-400 transition">Start a Project</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Explore Column */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Explore</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/explore-campaigns?category=Education" className="hover:text-amber-400 transition">Education</Link></li>
            <li><Link href="/explore-campaigns?category=Film" className="hover:text-amber-400 transition">Film & Video</Link></li>
            <li><Link href="/explore-campaigns?category=Food" className="hover:text-amber-400 transition">Food</Link></li>
            <li><Link href="/explore-campaigns?category=Games" className="hover:text-amber-400 transition">Games</Link></li>
            <li><Link href="/explore-campaigns?category=Technology" className="hover:text-amber-400 transition">Technology</Link></li>
          </ul>
        </div>

      </div>
      
      {/* Copyright and Social Icons Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} FundRise Platform. All rights reserved.</p>
        
        <div className="flex items-center gap-4 mt-4 sm:mt-0 text-slate-300">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
            <FaFacebookF size={14} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
            <FaTwitter size={14} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
            <FaInstagram size={14} />
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
            <FaPinterestP size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}