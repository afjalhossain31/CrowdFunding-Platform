"use client";

import { useState, useEffect } from "react";

export default function useRole() {
  const [role, setRole] = useState(null); // 'supporter', 'creator', বা 'admin'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // এখানে তুমি তোমার Auth Context বা Local Storage থেকে ইউজারের রোল বের করে আনবে।
    // যেহেতু রিকোয়ারমেন্টে বলা আছে "store a secret access-token for users in their browser local storage"
    
    const fetchRole = () => {
      try {
        // এটি আপাতত একটি ডামি রোল (টেস্টিংয়ের জন্য)। 
        // পরবর্তীতে তুমি এখানে ব্যাকএন্ড বা টোকেন থেকে আসল রোল সেট করবে।
        const currentRole = "supporter"; 
        
        setRole(currentRole);
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  return { role, loading };
}