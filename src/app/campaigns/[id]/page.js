"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Heart, Share2, Bookmark, CheckCircle2 } from "lucide-react";

export default function CampaignDetails({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("story"); // 'story', 'updates', 'backers'

  useEffect(() => {
    if (!id) return;

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
        <span className="loading loading-spinner loading-lg text-emerald-600">Loading...</span>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Campaign Not Found</h2>
        <Link href="/" className="text-emerald-600 underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  const raised = campaign.raised_amount || 0;
  const goal = campaign.funding_goal || campaign.minDonation || 1;
  const percentage = Math.min(((raised / goal) * 100), 100).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 font-sans">
      
      {/* 1. Top Main Section (Image Left, Details Right matching screenshot 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Big Image & Wishlist */}
        <div className="lg:col-span-7 relative">
          <div className="relative h-[380px] sm:h-[450px] rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100">
            <img
              src={campaign.image || campaign.campaign_image_url}
              alt={campaign.title || campaign.campaign_title}
              className="w-full h-full object-cover"
            />
            <button className="absolute top-4 right-4 w-10 h-10 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-md text-amber-500 transition">
              <Heart size={20} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Right: Title, Creator, Progress, and Back Campaign */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
              {campaign.title || campaign.campaign_title}
            </h1>

            {/* Creator Profile Info */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
              <img
                src={campaign.creator_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"}
                alt="creator"
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <p className="text-xs text-slate-500">by <span className="text-emerald-600 font-semibold">{campaign.creator_name || "Jane Smith"}</span></p>
                <p className="text-[11px] text-slate-400 mt-0.5">12 Campaigns Created &bull; San Francisco, CA</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden mb-3">
              <div className="bg-emerald-500 h-full" style={{ width: `${percentage}%` }} />
            </div>

            {/* Raised & Percentage */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white">${raised.toLocaleString()}</span>
                <span className="text-xs text-slate-500 ml-1.5">raised of ${goal.toLocaleString()} goal</span>
              </div>
              <span className="text-emerald-600 font-bold text-base">{percentage}%</span>
            </div>

            {/* Category, Backers, Days left tags */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-200 mb-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-600">📁</span> {campaign.category || "Design"}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-600">👤</span> 2 Backers
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-600">🕒</span> {campaign.deadline ? "0 Days to go" : "Ongoing"}
              </div>
            </div>
          </div>

          {/* Donation Input & Back Campaign Button */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-3 text-slate-400 font-bold">$</span>
              <input 
                type="number" 
                defaultValue={campaign.minDonation || 100} 
                className="w-full pl-8 pr-4 py-3 bg-slate-100 dark:bg-zinc-800 border border-slate-200 rounded-lg font-bold text-slate-800 dark:text-white focus:outline-none"
              />
            </div>
            <button 
              onClick={() => alert("Thank you for backing this campaign!")}
              className="flex-1 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold py-3 px-6 rounded-lg uppercase tracking-wider text-xs transition shadow-md"
            >
              BACK CAMPAIGN
            </button>
          </div>

          {/* Social Share Icons */}
          <div className="flex items-center gap-4 mt-6 text-slate-500">
            <span className="text-xs text-slate-400">Share:</span>
            <a href="#" className="hover:text-emerald-600 transition">f</a>
            <a href="#" className="hover:text-emerald-600 transition">t</a>
            <a href="#" className="hover:text-emerald-600 transition">in</a>
            <a href="#" className="hover:text-emerald-600 transition">@</a>
          </div>

        </div>
      </div>

      {/* 2. Tab Navigation Bar (Project Story, Updates, Backer List) */}
      <div className="flex border-b border-slate-200 mt-16 mb-10 gap-2">
        <button 
          onClick={() => setActiveTab("story")}
          className={`px-6 py-3 font-semibold text-sm transition-all rounded-t-lg ${activeTab === "story" ? "bg-emerald-500 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          Project Story
        </button>
        <button 
          onClick={() => setActiveTab("updates")}
          className={`px-6 py-3 font-semibold text-sm transition-all rounded-t-lg ${activeTab === "updates" ? "bg-emerald-500 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          Updates
        </button>
        <button 
          onClick={() => setActiveTab("backers")}
          className={`px-6 py-3 font-semibold text-sm transition-all rounded-t-lg ${activeTab === "backers" ? "bg-emerald-500 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          Backer List
        </button>
      </div>

      {/* 3. Tab Content Section (Matching screenshot 2 layout) */}
      {activeTab === "story" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Full Story Description & Secondary Image */}
          <div className="lg:col-span-8 space-y-6 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              {campaign.description || "Add-in your full project description here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate sed mauris vitae pellentesque. Nunc ut ullamcorper libero. Aenean fringilla mauris quis risus laoreet interdum."}
            </p>
            <p>
              Quisque imperdiet orci in metus aliquam egestas. Fusce elit libero, imperdiet nec orci quis, convallis hendrerit nisl. Cras auctor nec purus at placerat. Quisque consectetur, lectus in ullamcorper tempus, dolor arcu suscipit elit, id laoreet tortor justo nec arcu.
            </p>

            <div className="rounded-xl overflow-hidden shadow-md mt-6 bg-slate-100 h-[350px]">
              <img 
                src={campaign.image || campaign.campaign_image_url} 
                alt="story detail" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Right: Rewards Sidebar Box (Matching screenshot 2 right box) */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Rewards</h3>
            
            <div className="mb-6">
              <span className="text-2xl font-black text-emerald-600">$500 <span className="text-xs font-normal text-slate-500">or more</span></span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Reward description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum congue nunc.
              </p>
            </div>

            <div className="text-xs text-slate-500 mb-6 space-y-1">
              <p className="font-bold text-slate-800 dark:text-slate-200">May, 2021</p>
              <p>Estimated Delivery</p>
              <div className="pt-3 flex justify-between items-center border-t border-slate-200 mt-3">
                <span>👤 1 backers</span>
                <span>🎁 9 rewards left</span>
              </div>
            </div>

            <button 
              onClick={() => alert("Reward selected!")}
              className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition shadow-sm"
            >
              SELECT REWARD
            </button>
          </div>

        </div>
      )}

      {activeTab === "updates" && (
        <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-base font-semibold">No updates posted yet for this campaign.</p>
        </div>
      )}

      {activeTab === "backers" && (
        <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-base font-semibold">Be the first backer to support this project!</p>
        </div>
      )}

      {/* 4. Related Projects Section (Matching screenshot 3) */}
      <div className="mt-24 border-t border-slate-200 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Related Projects</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2">
            Discover projects just for you and get great recommendations when you select your interests.
          </p>
        </div>

        {/* Static or Dynamic Related Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "xRay – Complete Bicycle Tail Light", category: "DESIGN", price: "$2,600", goal: "$25,000", percent: "10.40%", img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=500&auto=format&fit=crop" },
            { title: "Bourne – Travel Briefcase & Padfolio", category: "DESIGN", price: "$9,700", goal: "$25,000", percent: "38.80%", img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=500&auto=format&fit=crop" },
            { title: "OfficeX – Luxury Seating for your Office", category: "DESIGN", price: "$20,000", goal: "$30,000", percent: "66.67%", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=500&auto=format&fit=crop" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="relative h-48 bg-slate-100">
                <span className="absolute top-3 right-3 z-10 bg-amber-400 text-zinc-950 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {item.category}
                </span>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs text-emerald-600 font-semibold mb-1">by Jane Smith</p>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 line-clamp-1 mb-4">{item.title}</h3>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="bg-emerald-500 h-full" style={{ width: item.percent }}></div>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-800">{item.price}</span>
                  <span className="text-emerald-600 font-semibold">{item.percent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}