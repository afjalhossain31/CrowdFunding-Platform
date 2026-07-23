"use client";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import axiosSecure from "@/lib/axiosSecure";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then((res) => setCredits(res.data?.credits ?? 0))
        .catch((err) => console.error("Failed to fetch credits", err));
    }
  }, [user]);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-primary">
          FundRise
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/explore-campaigns">Explore Campaigns</Link>
          {user && <Link href="/dashboard">Dashboard</Link>}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/your-username/crowdfunding-client"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:block text-sm px-3 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
          >
            Join as Developer
          </a>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-accent">{credits} credits</span>
              <NotificationBell />
              <img
                src={user.photoURL || "https://i.ibb.co/2Y0hN8k/avatar.png"}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-primary"
              />
              <button
                onClick={logout}
                className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium">
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm px-4 py-1.5 rounded-full bg-primary text-white hover:opacity-90 transition"
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