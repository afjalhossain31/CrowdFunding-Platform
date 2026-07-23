"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => setCredits(data?.credits ?? 0))
        .catch((err) => console.error("Failed to fetch credits", err));
    }
  }, [user]);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
            F
          </div>
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            FundRise
          </span>
        </Link>

        {/* Navigation Links (Home, Explore, Campaigns, Dashboard) */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700 dark:text-gray-200">
          <Link 
            href="/" 
            className="px-3.5 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-transparent hover:border-blue-200 dark:hover:border-zinc-700"
          >
            Home
          </Link>

          <Link 
            href="/explore" 
            className="px-3.5 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-transparent hover:border-blue-200 dark:hover:border-zinc-700"
          >
            Explore
          </Link>
          
          <Link 
            href="/explore-campaigns" 
            className="px-3.5 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-transparent hover:border-blue-200 dark:hover:border-zinc-700"
          >
            Campaigns
          </Link>

          {user && (
            <Link 
              href="/dashboard" 
              className="px-3.5 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-transparent hover:border-blue-200 dark:hover:border-zinc-700"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Right Actions / User Profile */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/your-username/crowdfunding-client"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center text-xs font-semibold px-3.5 py-2 rounded-lg border border-blue-600/30 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          >
            Join as Developer
          </a>

          {user ? (
            <div className="flex items-center gap-3">
              
              {/* Credits Badge */}
              <Link
                href="/dashboard" 
                title="View your dashboard & credits"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold shadow-xs hover:scale-105 transition-transform cursor-pointer"
              >
                <span>⚡</span>
                <span>{credits} credits</span>
              </Link>

              <NotificationBell />

              {/* User Profile Image */}
              <div className="relative group">
                <img
                  src={user.photoURL || "https://i.ibb.co/2Y0hN8k/avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/50 p-0.5 shadow-sm"
                />
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 dark:bg-zinc-800 dark:hover:bg-red-950/50 dark:hover:text-red-400 transition-all text-gray-700 dark:text-gray-300 shadow-xs"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link 
                href="/login" 
                className="text-sm font-semibold px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-600/30"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}