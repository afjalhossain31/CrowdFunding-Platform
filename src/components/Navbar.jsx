"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react"; // Arrow Icon

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center">
      
      {/* Website Logo */}
      <Link href="/">
        <h1 className="text-2xl font-extrabold text-emerald-600 cursor-pointer">
          CROWDFUND
        </h1>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 relative">
        
        <Link href="/" className="text-slate-700 hover:text-emerald-500 font-medium transition-colors">
          Home
        </Link>

        {/* Dropdown Menu Item (Explore Campaigns) */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button 
            className="flex items-center gap-1 text-slate-700 hover:text-emerald-500 font-medium transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Explore Campaigns
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-emerald-500' : ''}`} />
          </button>

          {/* Dropdown Content (Screen-shot er moto) */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-slate-100 shadow-xl rounded-md overflow-hidden z-50 transition-all duration-300 animate-fadeIn">
              <div className="flex flex-col py-2">
                <Link href="/campaigns?category=technology" className="px-5 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600">
                  Technology Projects
                </Link>
                <Link href="/campaigns?category=health" className="px-5 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600">
                  Health & Medical
                </Link>
                <Link href="/campaigns?category=community" className="px-5 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600">
                  Community Causes
                </Link>
                <hr className="my-1 border-slate-100" />
                <Link href="/campaigns" className="px-5 py-2.5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50">
                  View All Campaigns →
                </Link>
              </div>
            </div>
          )}
        </div>

        <Link href="/dashboard" className="text-slate-700 hover:text-emerald-500 font-medium transition-colors">
          Dashboard
        </Link>

      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-slate-700 hover:text-emerald-500 font-medium">
          Login
        </Link>
        <Link href="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-md font-medium transition-colors">
          Register
        </Link>
      </div>

    </nav>
  );
}