"use client";

import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/utils/firebase.config";

// Context তৈরি করা হলো
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // লগইন করার ফাংশন
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // লগআউট করার ফাংশন
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ইউজারের স্টেট ট্র‍্যাক করার জন্য Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // ক্লিনআপ ফাংশন
    return () => {
      unsubscribe();
    };
  }, []);

  // যেসব ডাটা পুরো অ্যাপে শেয়ার করতে চাই
  const authInfo = {
    user,
    loading,
    loginUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}