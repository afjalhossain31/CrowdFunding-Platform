"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User, DollarSign } from "lucide-react";

export default function CampaignDetails({ params }) {
  // Next.js 15+ এ params আনর্যাপ করার জন্য use() ব্যবহার করতে হয়
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // ডাটাবেজ থেকে নির্দিষ্ট ID এর ক্যাম্পেইন ফেচ করা
    fetch(`http://localhost:5000/campaigns/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCampaign(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch campaign details", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-indigo-600">Loading...</span>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Campaign Not Found</h2>
        <Link href="/" className="text-indigo-600 underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 mb-6 transition">
        <ArrowLeft size={16} /> Back to Campaigns
      </Link>

      {/* Campaign Image */}
      <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg mb-8 bg-slate-100">
        <img
          src={campaign.image || campaign.campaign_image_url}
          alt={campaign.title || campaign.campaign_title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 right-4 bg-amber-400 text-zinc-950 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
          {campaign.category || "General"}
        </span>
      </div>

      {/* Campaign Info */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
          {campaign.title || campaign.campaign_title}
        </h1>

        {/* Creator Details */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100 dark:border-zinc-800">
          <img
            src={campaign.creator_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"}
            alt="creator"
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <p className="text-xs text-gray-400">Created by</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{campaign.creator_name || "Anonymous"}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Campaign Description</h3>
          <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            {campaign.description}
          </p>
        </div>

        {/* Financial & Goal Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-xl mb-8 border border-slate-100 dark:border-zinc-800">
          <div>
            <p className="text-xs text-gray-400">Goal Amount</p>
            <p className="text-lg font-bold text-slate-800 dark:text-white">${campaign.funding_goal || campaign.minDonation || 0}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Amount Raised</p>
            <p className="text-lg font-bold text-emerald-600">${campaign.raised_amount || 0}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Min Donation</p>
            <p className="text-lg font-bold text-indigo-600">${campaign.minDonation || 10}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Deadline</p>
            <p className="text-sm font-bold text-slate-800 dark:text-white mt-1">{campaign.deadline || "N/A"}</p>
          </div>
        </div>

        {/* Donate / Support Button */}
        <button 
          onClick={() => alert("Donation feature coming soon!")}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition shadow-lg text-sm uppercase tracking-wider"
        >
          Support This Campaign
        </button>
      </div>
    </div>
  );
}