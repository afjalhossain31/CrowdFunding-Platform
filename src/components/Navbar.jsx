"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import Link from "next/link";
import { ChevronDown, Menu, X, User, LogOut } from "lucide-react"; 

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [isMobileExploreOpen, setIsMobileExploreOpen] = useState(false); 

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 relative z-50 font-sans">
      <div className="py-4 px-6 md:px-12 flex justify-between items-center">
        
        {/* Website Logo */}
        <Link href="/" className="flex items-center gap-2.5 group outline-none">
          <div className="relative flex items-center justify-center">
            <svg 
              className="w-10 h-10 text-emerald-600 transform transition-transform duration-300 group-hover:scale-105" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 16H10V26.5C7 26 5 26.2 4 26.5V16Z" fill="currentColor" />
              <rect x="5.5" y="18.5" width="3" height="2.5" rx="0.5" fill="white" />
              <rect x="5.5" y="22.5" width="3" height="2.5" rx="0.5" fill="white" />
              <path d="M12 10H19V26C16 25.3 14 25.3 12 26V10Z" fill="currentColor" />
              <rect x="14" y="12.5" width="3" height="2.5" rx="0.5" fill="white" />
              <rect x="14" y="16.5" width="3" height="2.5" rx="0.5" fill="white" />
              <rect x="14" y="20.5" width="3" height="2.5" rx="0.5" fill="white" />
              <path d="M21 4H28V26.5C25 26.2 23 26 21 26.5V4Z" fill="currentColor" />
              <rect x="23" y="6.5" width="3" height="2.5" rx="0.5" fill="white" />
              <rect x="23" y="10.5" width="3" height="2.5" rx="0.5" fill="white" />
              <rect x="23" y="14.5" width="3" height="2.5" rx="0.5" fill="white" />
              <rect x="23" y="18.5" width="3" height="2.5" rx="0.5" fill="white" />
              <rect x="23" y="22.5" width="3" height="2.5" rx="0.5" fill="white" />
              <path 
                d="M3 28.5C11 26.5 21 26.5 29 28.5" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-[26px] font-black tracking-[0.15em] text-gray-900 leading-none">
              CROWD<span className="text-emerald-600">FUND</span>
            </h1>
            <span className="text-[10px] font-semibold text-gray-500 tracking-[0.3em] uppercase mt-1">
              Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 relative">
          <Link href="/" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
            Home
          </Link>

          {/* Desktop Dropdown for Campaigns */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link 
              href="/explore"
              className="flex items-center gap-1 text-slate-700 hover:text-emerald-600 font-medium transition-colors outline-none py-2"
            >
              Campaigns
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-emerald-600' : ''}`} />
            </Link>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-60 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden transition-all duration-300 py-2">
                <div className="flex flex-col">
                  <Link href="/explore?category=technology" className="px-5 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                    Technology Projects
                  </Link>
                  <Link href="/explore?category=health" className="px-5 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                    Health & Medical
                  </Link>
                  <Link href="/explore?category=community" className="px-5 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                    Community Causes
                  </Link>
                  <Link href="/explore?category=education" className="px-5 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                    Education
                  </Link>
                  <hr className="my-1.5 border-slate-100" />
                  <Link href="/explore-campaigns" className="px-5 py-2.5 text-sm font-bold text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center justify-between">
                    View All Campaigns →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/dashboard" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors">
            Dashboard
          </Link>
        </div>

        {/* Desktop Auth / Profile Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 px-3.5 py-2 rounded-xl border border-slate-200 transition-all"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-7 h-7 rounded-full object-cover border border-emerald-500"
                  />
                ) : (
                  <User className="w-5 h-5 text-emerald-600" />
                )}
                <span className="font-semibold text-sm">
                  {user.displayName || "Profile"}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-slate-700 hover:text-emerald-600 font-semibold transition-colors px-3 py-2">
                Login
              </Link>
              <Link href="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm text-sm">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-700 hover:text-emerald-600 focus:outline-none p-1"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl flex flex-col py-4 px-6 z-50">
          
          <Link 
            href="/" 
            className="py-3 text-slate-700 font-medium border-b border-slate-100 hover:text-emerald-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>

          {/* Mobile Campaigns Accordion */}
          <div className="border-b border-slate-100">
            <div className="flex items-center justify-between py-3">
              <Link 
                href="/explore" 
                className="text-slate-700 font-medium hover:text-emerald-600 transition-colors flex-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Campaigns
              </Link>
              <button 
                onClick={() => setIsMobileExploreOpen(!isMobileExploreOpen)}
                className="p-2 text-slate-400 hover:text-emerald-600 focus:outline-none"
              >
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileExploreOpen ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>
            </div>
            
            {isMobileExploreOpen && (
              <div className="flex flex-col gap-2 pb-4 pl-4 mt-1 bg-slate-50/50 rounded-xl p-3 border border-slate-100">
                <Link href="/explore?category=technology" className="py-2 text-sm text-slate-600 hover:text-emerald-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Technology Projects
                </Link>
                <Link href="/explore?category=health" className="py-2 text-sm text-slate-600 hover:text-emerald-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Health & Medical
                </Link>
                <Link href="/explore?category=community" className="py-2 text-sm text-slate-600 hover:text-emerald-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Community Causes
                </Link>
                <Link href="/explore?category=education" className="py-2 text-sm text-slate-600 hover:text-emerald-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Education
                </Link>
                <Link href="/explore" className="py-2 text-sm font-bold text-emerald-600 mt-1" onClick={() => setIsMobileMenuOpen(false)}>
                  View All Campaigns →
                </Link>
              </div>
            )}
          </div>

          <Link 
            href="/dashboard" 
            className="py-3 text-slate-700 font-medium border-b border-slate-100 hover:text-emerald-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>

          {/* Mobile Auth / Profile Buttons */}
          <div className="flex flex-col gap-3 py-6">
            {user ? (
              <>
                <Link 
                  href="/profile" 
                  className="w-full flex items-center justify-center gap-2 py-3 border border-emerald-200 bg-emerald-50 rounded-xl text-emerald-700 font-semibold hover:bg-emerald-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="w-full text-center py-3 border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="w-full text-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}