"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import { auth } from "@/utils/firebase.config";
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

      // ৪. রোল অনুযায়ী ক্রেডিট সেট করা
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

      // ৬. তোমার Backend API-তে ডেটা পাঠানো (localhost:5000 বা তোমার সার্ভার পোর্ট অনুযায়ী)
      const dbResponse = await axios.post("http://localhost:5000/users", userInfo);

      if (dbResponse.data.insertedId) {
        alert("Registration Successful!"); // চাইলে টোস্ট (Toast) ব্যবহার করতে পারো
        
        // ৭. লগইন পেজে পাঠিয়ে দেওয়া
        router.push("/login");
      }

    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-zinc-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Full Name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>

          {/* Profile Image Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-1 w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-zinc-700 dark:file:text-blue-400"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Role</label>
            <div className="flex gap-4">
              <label className="flex items-center dark:text-gray-300">
                <input
                  type="radio"
                  name="role"
                  value="Supporter"
                  checked={role === "Supporter"}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                Supporter
              </label>
              <label className="flex items-center dark:text-gray-300">
                <input
                  type="radio"
                  name="role"
                  value="Creator"
                  checked={role === "Creator"}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                Creator
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}