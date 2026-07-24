"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, Coins, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function Profile() {
  const { user, logOut, loading } = useContext(AuthContext);
  const router = useRouter();
  const [dbUser, setDbUser] = useState(null);
  const [fetching, setFetching] = useState(true);

  // ডাটাবেস থেকে ইউজার রোল ও ক্রেডিট ডেটা নিয়ে আসা
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/${user.email}`)
        .then((res) => {
          setDbUser(res.data);
          setFetching(false);
        })
        .catch((err) => {
          console.error("Failed to fetch DB user profile:", err);
          setFetching(false);
        });
    } else if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
        >
          {/* Header & Avatar */}
          <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-slate-100">
            <div className="relative">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user?.displayName || "User"}
                  className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500/20 shadow-md"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-3xl border-4 border-emerald-500/20">
                  {user?.displayName?.charAt(0) || "U"}
                </div>
              )}
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                {user?.displayName || "User Profile"}
              </h1>
              <p className="text-slate-500 text-sm mt-1">{user?.email}</p>
              
              <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
                {dbUser?.role || "Supporter"}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2.5 rounded-xl transition duration-200 text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Details Section Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Full Name</p>
                <p className="text-slate-700 font-semibold">{user?.displayName || "N/A"}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Email Address</p>
                <p className="text-slate-700 font-semibold truncate max-w-[200px]">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Available Credits</p>
                <p className="text-slate-700 font-semibold">{dbUser?.credits ?? 0} Credits</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Account Role</p>
                <p className="text-slate-700 font-semibold">{dbUser?.role || "Supporter"}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}