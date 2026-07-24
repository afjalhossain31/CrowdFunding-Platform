"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

export default function AddCampaignPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const form = e.target;
    const title = form.title.value.trim();
    const category = form.category.value;
    const image = form.image.value.trim();
    const minDonation = parseFloat(form.minDonation.value);
    const funding_goal = parseFloat(form.funding_goal.value);
    const deadline = form.deadline.value;
    const description = form.description.value.trim();

    // ভ্যালিডেশন চেক
    if (minDonation > funding_goal) {
      setErrorMessage("Minimum donation amount কখনোই Funding goal থেকে বেশি হতে পারবে না।");
      setLoading(false);
      return;
    }

    const newCampaign = {
      title,
      campaign_title: title,
      category,
      image,
      campaign_image_url: image,
      minDonation,
      funding_goal,
      raised_amount: 0,
      deadline,
      description,
      creator_name: user?.displayName || "Anonymous Creator",
      creator_email: user?.email || "creator@gmail.com",
      creator_image: user?.photoURL || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    };

    try {
      const res = await fetch("http://localhost:5000/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCampaign),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Campaign added successfully!");
        router.push("/explore");
      } else {
        setErrorMessage(data.message || "Failed to add campaign");
      }
    } catch (error) {
      console.error("Error adding campaign:", error);
      setErrorMessage("সার্ভারের সাথে সংযোগ স্থাপন করতে সমস্যা হচ্ছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Header Banner */}
        <div className="bg-slate-900 text-white py-8 px-8 text-center relative">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Start a New Campaign</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Fill out the form below to launch your project and start raising funds.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-semibold rounded-xl text-center">
            {errorMessage}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Campaign Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Campaign Title
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Free Medical Camp for Rural Families"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
              >
                <option value="Health">Health</option>
                <option value="Medical">Medical</option>
                <option value="Technology">Technology</option>
                <option value="Community">Community</option>
                <option value="Education">Education</option>
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Image URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                required
                placeholder="https://images.pexels.com/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            {/* Minimum Donation */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Minimum Donation Amount ($)
              </label>
              <input
                type="number"
                name="minDonation"
                required
                placeholder="30"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Funding Goal */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Funding Goal ($)
              </label>
              <input
                type="number"
                name="funding_goal"
                required
                placeholder="8000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

          </div>

          {/* User Email (Read-only) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Creator Email (Logged in)
            </label>
            <input
              type="email"
              disabled
              value={user?.email || "creator@gmail.com"}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="5"
              placeholder="Support a free healthcare initiative..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl uppercase tracking-wider text-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? "Adding Campaign..." : "Add Campaign"}
          </button>

        </form>

      </div>
    </div>
  );
}