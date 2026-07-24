"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Heart, Share2, Bookmark, CheckCircle2, Clock } from "lucide-react";

export default function CampaignDetails({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [campaign, setCampaign] = useState(null);
  const [relatedCampaigns, setRelatedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("story");

  // Fetch Current Campaign Details
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

  // Fetch All Campaigns from MongoDB to show Related Projects (excluding current one)
  useEffect(() => {
    fetch("http://localhost:5000/campaigns")
      .then((res) => res.json())
      .then((data) => {
        // বর্তমান ক্যাম্পেইন বাদ দিয়ে বাকিগুলো থেকে প্রথম ৩টি বা রেন্ডম ৩টি সিলেক্ট করা
        const filtered = data.filter((item) => item._id !== id);
        setRelatedCampaigns(filtered.slice(0, 3));
      })
      .catch((err) => {
        console.error("Failed to fetch related campaigns", err);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-20 bg-slate-50 min-h-screen">
        <h2 className="text-2xl font-bold text-slate-800">Campaign Not Found</h2>
        <Link href="/" className="text-emerald-600 font-semibold underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  const raised = campaign.raised_amount || 0;
  const goal = campaign.funding_goal || campaign.minDonation || 1;
  const percentage = Math.min(((raised / goal) * 100), 100).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-50 py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          
          {/* Left: Big Image & Wishlist */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[380px] sm:h-[450px] rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100">
              <img
                src={campaign.image || campaign.campaign_image_url}
                alt={campaign.title || campaign.campaign_title}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-md text-slate-400 hover:text-emerald-500 transition-colors group">
                <Heart size={20} className="group-hover:fill-emerald-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Right: Title, Creator, Progress, and Back Campaign */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight mb-4">
                {campaign.title || campaign.campaign_title}
              </h1>

              {/* Creator Profile Info */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <img
                  src={`https://ui-avatars.com/api/?name=${campaign.creator_name || "Creator"}&background=random`}
                  alt="creator"
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100"
                />
                <div>
                  <p className="text-xs text-slate-400">
                    by <span className="text-emerald-500 font-medium">{campaign.creator_name || "Verified Creator"}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Verified Creator &bull; Community Leader</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-1 rounded-full mb-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
              </div>

              {/* Raised & Percentage */}
              <div className="flex justify-between items-baseline mb-1">
                <p className="text-2xl font-bold text-slate-800">${raised.toLocaleString()}</p>
                <p className="text-sm font-medium text-slate-700">{percentage}%</p>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                raised of ${goal.toLocaleString()} goal
              </p>

              {/* Category, Backers, Days left tags */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100 mb-6 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500">📁</span> <span className="capitalize">{campaign.category || "General"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500">👤</span> 2 Backers
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Ongoing</span>
                </div>
              </div>
            </div>

            {/* Donation Input & Back Campaign Button */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-3 text-slate-400 font-bold">$</span>
                <input 
                  type="number" 
                  defaultValue={campaign.minDonation || 100} 
                  className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                />
              </div>
              <button 
                onClick={() => alert("Thank you for backing this campaign!")}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl uppercase tracking-wider text-xs transition-colors shadow-sm"
              >
                BACK CAMPAIGN
              </button>
            </div>

            {/* Social Share Icons */}
            <div className="flex items-center gap-4 mt-6 text-slate-500">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Share:</span>
              <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-600 transition"><Share2 size={14} /></button>
              <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-600 transition"><Bookmark size={14} /></button>
            </div>

          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex border-b border-slate-200 mt-12 mb-8 gap-2">
          <button 
            onClick={() => setActiveTab("story")}
            className={`px-6 py-3 font-semibold text-sm transition-all rounded-t-xl ${activeTab === "story" ? "bg-emerald-600 text-white shadow-sm" : "bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-b-0 border-slate-200"}`}
          >
            Project Story
          </button>
          <button 
            onClick={() => setActiveTab("updates")}
            className={`px-6 py-3 font-semibold text-sm transition-all rounded-t-xl ${activeTab === "updates" ? "bg-emerald-600 text-white shadow-sm" : "bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-b-0 border-slate-200"}`}
          >
            Updates
          </button>
          <button 
            onClick={() => setActiveTab("backers")}
            className={`px-6 py-3 font-semibold text-sm transition-all rounded-t-xl ${activeTab === "backers" ? "bg-emerald-600 text-white shadow-sm" : "bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-b-0 border-slate-200"}`}
          >
            Backer List
          </button>
        </div>

        {/* Tab Content Section */}
        {activeTab === "story" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Full Story Description */}
            <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed">
              <h3 className="text-xl font-bold text-slate-800 mb-2">About this project</h3>
              <p className="whitespace-pre-wrap">
                {campaign.description || "This creator has not provided a detailed description yet."}
              </p>

              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-100 mt-6 bg-slate-50 h-[350px]">
                <img 
                  src={campaign.image || campaign.campaign_image_url} 
                  alt="story detail" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Right: Rewards Sidebar Box */}
            <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500 w-5 h-5" /> Rewards
              </h3>
              
              <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-2xl font-black text-emerald-600">${campaign.minDonation || 50} <span className="text-xs font-semibold text-slate-500">or more</span></span>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Get early access to our product and an exclusive mention on our supporters page.
                </p>
              </div>

              <div className="text-xs font-medium text-slate-500 mb-6 space-y-2">
                <p className="font-bold text-slate-700">Estimated Delivery: <span className="font-normal text-slate-500">Dec 2026</span></p>
                <div className="pt-3 flex justify-between items-center border-t border-slate-100 mt-3">
                  <span className="flex items-center gap-1"><span className="text-emerald-500">👤</span> 1 backer</span>
                  <span className="flex items-center gap-1"><span className="text-emerald-500">🎁</span> 9 left</span>
                </div>
              </div>

              <button 
                onClick={() => alert("Reward selected!")}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
              >
                SELECT REWARD
              </button>
            </div>

          </div>
        )}

        {activeTab === "updates" && (
          <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 text-2xl">📣</div>
            <p className="text-base font-semibold text-slate-700">No updates posted yet</p>
            <p className="text-sm mt-1">The creator will post project updates here.</p>
          </div>
        )}

        {activeTab === "backers" && (
          <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 text-2xl">🤝</div>
            <p className="text-base font-semibold text-slate-700">Be the first backer!</p>
            <p className="text-sm mt-1">Support this project to see your name here.</p>
          </div>
        )}

        {/* Related Projects Section (Dynamic from MongoDB) */}
        {relatedCampaigns.length > 0 && (
          <div className="mt-24 border-t border-slate-200 pt-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-slate-800">Related Projects</h2>
              <p className="text-slate-500 text-sm mt-2">
                Discover similar campaigns you might be interested in supporting.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCampaigns.map((item) => {
                const itemRaised = item.raised_amount || 0;
                const itemGoal = item.funding_goal || item.minDonation || 1;
                const itemPercent = Math.min(((itemRaised / itemGoal) * 100), 100).toFixed(1);

                return (
                  <div key={item._id} className="bg-white border border-slate-100 rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <span className="absolute top-3 right-3 z-10 bg-white/90 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wider backdrop-blur-sm">
                        {item.category || "GENERAL"}
                      </span>
                      <img 
                        src={item.image || item.campaign_image_url} 
                        alt={item.title || item.campaign_title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <div className="pt-6 pb-5 px-5 flex-1 flex flex-col">
                      <p className="text-xs text-slate-400 mb-1.5">
                        by <span className="text-emerald-500 font-medium">{item.creator_name || "Verified Creator"}</span>
                      </p>
                      
                      <Link href={`/campaigns/${item._id}`}>
                        <h3 className="text-lg font-bold text-slate-800 mb-5 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {item.title || item.campaign_title}
                        </h3>
                      </Link>
                      
                      <div className="flex-grow"></div>
                      
                      <div>
                        <div className="w-full bg-slate-100 h-1 rounded-full mb-2.5 overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${itemPercent}%` }}></div>
                        </div>
                        <div className="flex justify-between items-baseline mb-0.5">
                          <p className="text-base font-bold text-slate-800">${itemRaised.toLocaleString()}</p>
                          <p className="text-xs font-medium text-slate-700">{itemPercent}%</p>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-4">raised of ${itemGoal.toLocaleString()}</p>
                        <div className="w-full h-[1px] bg-slate-100 mb-3"></div>
                        
                        <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Ongoing</span>
                          </div>
                          <Link 
                            href={`/campaigns/${item._id}`}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold text-xs"
                          >
                            View Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}