"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ইমেইল-পাসওয়ার্ড দিয়ে লগইন
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      alert("Login Successful!");
      
      // JWT টোকেন পাওয়ার লজিক আমরা ব্যাকএন্ড করার সময় এখানে যোগ করব
      
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // গুগল সাইন-ইন
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await googleSignIn();
      const user = result.user;

      // গুগলে লগইন করলে আমরা ইউজারকে ডাটাবেসে সেভ করব ডিফল্ট "Supporter" হিসেবে
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo_url: user.photoURL,
        role: "Supporter",
        credits: 50, // Supporter হিসেবে ডিফল্ট ৫০ ক্রেডিট
      };

      // ব্যাকএন্ডের API কল করে ইউজার ডাটাবেসে সেভ করার লজিক (পরে ঠিক করব)
      // await axios.post("http://localhost:5000/users", userInfo);

      alert("Google Login Successful!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" required className="w-full px-4 py-2 border rounded-md" placeholder="Enter your email" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" name="password" required className="w-full px-4 py-2 border rounded-md" placeholder="Enter password" />
          </div>

          <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-2">
          <div className="h-px bg-gray-300 w-full"></div>
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px bg-gray-300 w-full"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn} 
          className="mt-6 w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition duration-300"
        >
          <FcGoogle className="text-2xl mr-2" />
          Sign in with Google
        </button>

        <p className="text-sm text-center mt-4">
          Dont have an account? <Link href="/register" className="text-blue-600 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}