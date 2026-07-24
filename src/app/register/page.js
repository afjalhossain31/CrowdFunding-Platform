"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import { auth } from "@/utils/firebase.config";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, UploadCloud, UserPlus } from "lucide-react";

export default function Register() {
  const router = useRouter();
  
  // ফর্মের স্টেটগুলো
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Supporter");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ImgBB API Key (অবশ্যই .env.local ফাইলে NEXT_PUBLIC_IMGBB_API_KEY নামে সেভ রাখবে)
  const image_hosting_key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = "";

      // ১. ImgBB-তে ছবি আপলোড করা (যদি ইউজার ছবি সিলেক্ট করে থাকে)
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        
        const imgRes = await axios.post(image_hosting_api, formData);
        if (imgRes.data.success) {
          imageUrl = imgRes.data.data.display_url;
        }
      }

      // ২. Firebase-এ ইউজার তৈরি করা
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ৩. Firebase প্রোফাইল আপডেট করা (নাম ও ছবি)
      await updateProfile(user, {
        displayName: name,
        photoURL: imageUrl,
      });

      // ৪. রোল অনুযায়ী ক্রেডিট সেট করা
      const credits = role === "Creator" ? 50 : 20;

      // ৫. ডাটাবেসে সেভ করার জন্য ইউজারের ইনফরমেশন রেডি করা
      const userInfo = {
        name: name,
        email: email,
        image: imageUrl,
        role: role,
        credits: credits,
        firebaseUid: user.uid,
      };

      // ৬. তোমার Backend API-তে ডেটা পাঠানো
      const dbResponse = await axios.post("http://localhost:5000/users", userInfo);

      if (dbResponse.data.insertedId) {
        alert("Registration Successful!"); 
        
        // ৭. লগইন পেজে পাঠিয়ে দেওয়া
        router.push("/login");
      }

    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Something went wrong during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden p-4 py-12">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[0%] left-[-10%] w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[0%] right-[-10%] w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full max-w-lg relative z-10"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center justify-center mb-4 outline-none">
            <h1 className="text-3xl font-black tracking-[0.15em] text-slate-900 leading-none">
              CROWD<span className="text-emerald-600">FUND</span>
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-slate-800">
            Create an Account
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Join us to support or create amazing campaigns.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center border border-red-100 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                placeholder="enter your full name"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-emerald-600 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Profile Image Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Profile Image</label>
            <div className="relative flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-3 file:px-4 file:border-0
                  file:text-sm file:font-semibold
                  file:bg-emerald-50 file:text-emerald-700
                  hover:file:bg-emerald-100 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer transition-all focus:outline-none"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select Your Role</label>
            <div className="grid grid-cols-2 gap-4">
              {/* Supporter Radio Card */}
              <label 
                className={`flex items-center justify-center py-3 px-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                  role === "Supporter" 
                    ? "bg-emerald-50 border-emerald-500 text-emerald-700 font-bold shadow-sm" 
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="Supporter"
                  checked={role === "Supporter"}
                  onChange={(e) => setRole(e.target.value)}
                  className="hidden"
                />
                Supporter
              </label>

              {/* Creator Radio Card */}
              <label 
                className={`flex items-center justify-center py-3 px-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                  role === "Creator" 
                    ? "bg-emerald-50 border-emerald-500 text-emerald-700 font-bold shadow-sm" 
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="Creator"
                  checked={role === "Creator"}
                  onChange={(e) => setRole(e.target.value)}
                  className="hidden"
                />
                Creator
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl transition duration-300 font-bold shadow-md shadow-emerald-200 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-slate-500 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors">
            Sign in here
          </Link>
        </p>

      </motion.div>
    </div>
  );
}