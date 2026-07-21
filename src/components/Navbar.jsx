"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("Logged out successfully"))
      .catch((error) => console.error(error));
  };

  return (
    <nav className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          CrowdFund
        </Link>

        {/* Center Links (Desktop only) */}
        <div className="hidden md:flex gap-6 items-center font-medium">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/campaigns" className="hover:text-blue-600 transition">All Campaigns</Link>
        </div>

        {/* Auth & Profile Section */}
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/dashboard" className="hidden md:block hover:text-blue-600 font-medium">
                Dashboard
              </Link>
              {/* Profile Picture */}
              <div title={user.displayName || "User"} className="w-10 h-10 rounded-full border-2 border-blue-600 overflow-hidden">
                <img 
                  src={user?.photoURL || "https://i.ibb.co/X2xMzwL/defult-user.png"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={handleLogOut} 
                className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 font-medium hover:text-blue-600 transition">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}