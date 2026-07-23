"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExplorePage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Explore Projects</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Discover a wide variety of creative and impactful projects from diverse categories.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <span className="loading loading-spinner loading-lg text-blue-600">Loading explore items...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((camp) => (
            <div key={camp._id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="relative h-48 bg-slate-100">
                <span className="absolute top-3 right-3 z-10 bg-amber-400 text-zinc-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {camp.category || "General"}
                </span>
                <img src={camp.image || camp.campaign_image_url} alt={camp.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-2 line-clamp-1">
                    {camp.title || camp.campaign_title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 mb-4">
                    {camp.description}
                  </p>
                </div>
                <Link
                  href={`/campaigns/${camp._id}`}
                  className="block w-full text-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}