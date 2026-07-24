"use client";

import { useContext, useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { AuthContext } from "@/context/AuthProvider";
import useRole from "@/hooks/useRole";
import axios from "axios";
import { Bell, Coins, User as UserIcon } from "lucide-react";

export default function DashboardLayout({ children }) {
  const { user } = useContext(AuthContext);
  const { role } = useRole();
  const [credits, setCredits] = useState(0);

  // ইউজারের ক্রেডিট ডাটাবেস থেকে নিয়ে আসার জন্য
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/${user.email}`)
        .then((res) => setCredits(res.data?.credits || 0))
        .catch((err) => console.error("Failed to fetch credits:", err));
    }
  }, [user]);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar - Fixed to the left */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar updated for Crowdfund with Emerald Theme */}
        <header className="h-20 px-6 md:px-8 flex items-center justify-between bg-white border-b border-slate-100 z-10 sticky top-0">
          <h2 className="text-xl font-extrabold text-slate-800">
            Welcome to <span className="text-emerald-600">Crowdfund</span>
          </h2>
          
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Available Credits Display (Dynamic) */}
            <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm border border-emerald-200 shadow-sm transition-all hover:bg-emerald-100">
              <Coins className="w-4 h-4 text-emerald-500" />
              Available Credits: {credits}
            </div>
            
            {/* Notification Icon */}
            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 border border-slate-100 transition-colors">
                <Bell className="w-5 h-5" />
                {/* Notification Badge */}
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
            
            {/* User Profile (Dynamic) */}
            <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full shadow-sm cursor-pointer border border-slate-100 hover:border-emerald-200 transition-colors">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center overflow-hidden border border-emerald-200">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="User Profile" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
              </div>
              <div className="hidden md:flex flex-col pr-2">
                <span className="text-sm font-bold text-slate-700 leading-tight truncate max-w-[120px]">
                  {user?.displayName || "Loading..."}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                  {role || "Supporter"}
                </span>
              </div>
            </div>

          </div>
        </header>

        {/* Dynamic Page Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}