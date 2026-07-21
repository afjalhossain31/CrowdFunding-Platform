"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Register() {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const image = form.image.files[0];

    // Password Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must have at least one uppercase letter");
      setLoading(false);
      return;
    }

    try {
      // 1. Upload Image to imgBB
      const formData = new FormData();
      formData.append("image", image);
      
      const imgbbAPIKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );
      const photoURL = imgbbResponse.data.data.display_url;

      // 2. Create User in Firebase
      const result = await createUser(email, password);
      
      // 3. Update Firebase Profile
      await updateUserProfile(name, photoURL);

      // 4. Determine default credits based on role
      const credits = role === "Supporter" ? 50 : 20;

      // 5. Save User Info to Database (Backend)
      const userInfo = {
        name,
        email,
        photo_url: photoURL,
        role,
        credits,
      };

      // Note: We haven't built this backend route yet, but we are setting it up!
      await axios.post("http://localhost:5000/users", userInfo);

      alert("Registration Successful!");
      router.push("/dashboard");

    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" name="name" required className="w-full px-4 py-2 border rounded-md" placeholder="Enter your name" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" required className="w-full px-4 py-2 border rounded-md" placeholder="Enter your email" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <input type="file" name="image" accept="image/*" required className="w-full px-4 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Select Role</label>
            <select name="role" required className="w-full px-4 py-2 border rounded-md">
              <option value="Supporter">Supporter</option>
              <option value="Creator">Creator</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" name="password" required className="w-full px-4 py-2 border rounded-md" placeholder="Enter password" />
          </div>

          <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}