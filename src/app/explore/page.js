"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExplorePage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // প্রতি পেজে কয়টি ক্যাম্পেইন দেখাবে

  useEffect(() => {
    fetch("http://localhost:5000/campaigns")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching explore data:", err);
        setLoading(false);
      });
  }, []);

  // Sorting logic
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
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans pb-20">
      
      {/* 1. Top Hero Banner Section */}
      <div className="relative bg-slate-900 text-white py-24 px-4 text-center overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1500&auto=format&fit=crop')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-900/80"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Explore</h1>
          <p className="text-sm md:text-base text-slate-300 font-medium">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link> <span className="mx-2">/</span> <span className="text-amber-400">Explore</span>
          </p>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* 2. Results Count & Sorting Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-4 border-b border-slate-200 dark:border-zinc-800 gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-bold text-slate-800 dark:text-white">{indexOfFirstItem + 1}–{Math.min(indexOfLastItem, sortedCampaigns.length)}</span> of {sortedCampaigns.length} results
          </p>

          <div className="flex items-center gap-2">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-semibold py-2.5 px-4 rounded-xl focus:outline-none shadow-xs cursor-pointer"
            >
              <option value="default">Default sorting</option>
              <option value="raised">Sort by Most Raised</option>
              <option value="price-low">Sort by Min Donation: Low to High</option>
              <option value="price-high">Sort by Min Donation: High to Low</option>
            </select>
          </div>
        </div>

        {/* 3. Campaigns Grid */}
        {loading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg text-amber-500">Loading explore items...</span>
          </div>
        ) : currentCampaigns.length === 0 ? (
          <p className="text-center text-gray-500 py-16 text-sm">No campaigns found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCampaigns.map((camp) => {
              const raised = camp.raised_amount || 0;
              const goal = camp.funding_goal || camp.minDonation || 1;
              const percentage = Math.min(((raised / goal) * 100), 100).toFixed(1);

              return (
                <div 
                  key={camp._id} 
                  className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-52 bg-slate-100 overflow-hidden">
                    <span className="absolute top-3 right-3 z-10 bg-amber-400 text-zinc-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {camp.category || "DESIGN"}
                    </span>
                    <img 
                      src={camp.image || camp.campaign_image_url} 
                      alt={camp.title || camp.campaign_title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
                        by {camp.creator_name || "Jane Smith"}
                      </p>
                      <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-2 line-clamp-1">
                        {camp.title || camp.campaign_title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 mb-6">
                        {camp.description}
                      </p>
                    </div>

                    <div>
                      <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-3">
                        <div className="bg-emerald-500 h-full" style={{ width: `${percentage}%` }} />
                      </div>

                      <div className="flex justify-between items-center text-xs text-slate-500 mb-5 pt-2 border-t border-slate-100 dark:border-zinc-800">
                        <span className="font-bold text-slate-800 dark:text-slate-200">${raised.toLocaleString()} raised</span>
                        <span className="text-emerald-600 font-semibold">{percentage}%</span>
                      </div>

                      <Link
                        href={`/campaigns/${camp._id}`}
                        className="block w-full text-center py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition shadow-sm"
                      >
                        See More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. Pagination Section (Matching your screenshot style) */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
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
                  className={`w-12 h-12 rounded-lg font-bold text-sm transition-all shadow-xs ${
                    isActive
                      ? "bg-amber-400 text-zinc-950 shadow-md scale-105"
                      : "bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800"
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
                className="px-5 h-12 rounded-lg font-bold text-sm bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-all shadow-xs"
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