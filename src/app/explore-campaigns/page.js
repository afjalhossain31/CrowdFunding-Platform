"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

export default function ExploreCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // প্রতি পেজে ৮টি করে দেখাবে

  useEffect(() => {
    fetch("http://localhost:5000/campaigns")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching campaigns:", err);
        setLoading(false);
      });
  }, []);

  // Sorting Logic
  const sortedCampaigns = [...campaigns].sort((a, b) => {
    if (sortOption === "price-low") {
      return (a.minDonation || 0) - (b.minDonation || 0);
    } else if (sortOption === "price-high") {
      return (b.minDonation || 0) - (a.minDonation || 0);
    } else if (sortOption === "raised") {
      return (b.raised_amount || 0) - (a.raised_amount || 0);
    }
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedCampaigns.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = sortedCampaigns.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* 1. Top Hero Banner Section */}
      <div className="relative bg-slate-900 text-white py-24 px-4 text-center overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1500&auto=format&fit=crop')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-900/80"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Explore Campaigns</h1>
          <p className="text-sm md:text-base text-slate-300 font-medium">
            <Link href="/" className="hover:text-emerald-400 transition">Home</Link> <span className="mx-2">/</span> <span className="text-emerald-400">Campaigns</span>
          </p>
        </div>
      </div>

      {/* Main Content Wrapper (TopCampaigns এর মতো max-w-7xl এবং সঠিক padding ব্যবহার করা হয়েছে) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2. Results Count & Sorting Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-4 border-b border-slate-200 gap-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-800">{sortedCampaigns.length > 0 ? indexOfFirstItem + 1 : 0}–{Math.min(indexOfLastItem, sortedCampaigns.length)}</span> of {sortedCampaigns.length} results
          </p>

          <div className="flex items-center gap-2">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-sm font-semibold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm cursor-pointer transition-all"
            >
              <option value="default">Default sorting</option>
              <option value="raised">Sort by Most Raised</option>
              <option value="price-low">Sort by Min Donation: Low to High</option>
              <option value="price-high">Sort by Min Donation: High to Low</option>
            </select>
          </div>
        </div>

        {/* 3. Campaigns Grid (TopCampaigns এর হুবহু ডিজাইন ও গ্যাপ) */}
        {loading ? (
          <div className="text-center py-20 flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-emerald-600"></span>
          </div>
        ) : currentCampaigns.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-md border border-slate-200 shadow-sm">
            <p className="text-slate-500 font-medium text-lg">No campaigns available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentCampaigns.map((campaign) => {
              const raised = campaign.raised_amount || 0;
              const goal = campaign.funding_goal || campaign.minDonation || 1;
              const percentage = Math.min(((raised / goal) * 100), 100).toFixed(2);

              return (
                <div
                  key={campaign._id}
                  className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group"
                >
                  {/* Image Section - h-44 */}
                  <div className="relative h-44 overflow-hidden">
                    <span className="absolute top-3 right-3 z-10 bg-white/90 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wider backdrop-blur-sm">
                      {campaign.category || "GENERAL"}
                    </span>
                    <img
                      src={campaign.image || campaign.campaign_image_url}
                      alt={campaign.title || campaign.campaign_title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Creator Avatar */}
                    <div className="absolute -bottom-4 left-5 w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-slate-200 shadow-sm z-10">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${campaign.creator_name || "Creator"}&background=random`} 
                        alt="creator"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="pt-6 pb-5 px-5 flex-1 flex flex-col">
                    
                    <div className="text-xs text-slate-400 mb-1.5">
                      by <span className="text-emerald-500 font-medium">{campaign.creator_name || "Verified Creator"}</span>
                    </div>

                    <Link href={`/campaigns/${campaign._id}`}>
                      <h3 className="text-lg font-bold text-slate-800 mb-5 leading-tight hover:text-emerald-600 transition-colors line-clamp-2">
                        {campaign.title || campaign.campaign_title}
                      </h3>
                    </Link>

                    <div className="flex-grow"></div>

                    <div>
                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 h-1 rounded-full mb-2.5 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-baseline mb-0.5">
                        <p className="text-base font-bold text-slate-800">${raised.toLocaleString()}</p>
                        <p className="text-xs font-medium text-slate-700">{percentage}%</p>
                      </div>
                      <p className="text-[11px] text-slate-400 mb-4">
                        raised of ${goal.toLocaleString()}
                      </p>

                      <div className="w-full h-[1px] bg-slate-100 mb-3"></div>

                      {/* Footer Info */}
                      <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Ongoing</span>
                        </div>
                        <Link 
                          href={`/campaigns/${campaign._id}`}
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
        )}

        {/* 4. Pagination Section */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              const isActive = currentPage === pageNum;

              return (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-10 h-10 rounded-md font-bold text-sm transition-all shadow-sm border ${
                    isActive
                      ? "bg-emerald-500 text-white border-emerald-500 scale-105"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Button */}
            {currentPage < totalPages && (
              <button
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-4 h-10 rounded-md font-bold text-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
              >
                Next ›
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}