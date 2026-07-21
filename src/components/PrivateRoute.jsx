"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // যদি লোডিং শেষ হয় এবং ইউজার লগইন করা না থাকে
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // ফায়ারবেস ডেটা লোড হওয়ার সময় একটি লোডিং স্পিন্টার দেখাতে পারো
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // ইউজার লগইন থাকলে সংশ্লিষ্ট পেজের কনটেন্ট দেখাবে
  return user ? children : null;
}