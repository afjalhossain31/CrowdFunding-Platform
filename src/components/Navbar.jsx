"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react"; // Arrow Icon

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center">


{/* Website Logo */}
<Link href="/" className="flex items-center gap-2.5 group outline-none">
  {/* Custom SVG Logo Icon (Inspired by your reference) */}
  <div className="relative flex items-center justify-center">
    <svg 
      className="w-10 h-10 text-emerald-600 transform transition-transform duration-300 group-hover:scale-105" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Small Building */}
      <path d="M4 16H10V26.5C7 26 5 26.2 4 26.5V16Z" fill="currentColor" />
      <rect x="5.5" y="18.5" width="3" height="2.5" rx="0.5" fill="white" />
      <rect x="5.5" y="22.5" width="3" height="2.5" rx="0.5" fill="white" />

      {/* Middle Medium Building */}
      <path d="M12 10H19V26C16 25.3 14 25.3 12 26V10Z" fill="currentColor" />
      <rect x="14" y="12.5" width="3" height="2.5" rx="0.5" fill="white" />
      <rect x="14" y="16.5" width="3" height="2.5" rx="0.5" fill="white" />
      <rect x="14" y="20.5" width="3" height="2.5" rx="0.5" fill="white" />

      {/* Right Tall Building */}
      <path d="M21 4H28V26.5C25 26.2 23 26 21 26.5V4Z" fill="currentColor" />
      <rect x="23" y="6.5" width="3" height="2.5" rx="0.5" fill="white" />
      <rect x="23" y="10.5" width="3" height="2.5" rx="0.5" fill="white" />
      <rect x="23" y="14.5" width="3" height="2.5" rx="0.5" fill="white" />
      <rect x="23" y="18.5" width="3" height="2.5" rx="0.5" fill="white" />
      <rect x="23" y="22.5" width="3" height="2.5" rx="0.5" fill="white" />
      
      {/* Bottom Connecting Arc */}
      <path 
        d="M3 28.5C11 26.5 21 26.5 29 28.5" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
    </svg>
  </div>

  {/* Typography - Styled to look like a brand image */}
  <div className="flex flex-col">
    <h1 className="text-2xl md:text-[26px] font-black tracking-[0.15em] text-gray-900 leading-none">
      CROWD<span className="text-emerald-600">FUND</span>
    </h1>
    <span className="text-[10px] font-semibold text-gray-500 tracking-[0.3em] uppercase mt-1">
      Platform
    </span>
  </div>
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