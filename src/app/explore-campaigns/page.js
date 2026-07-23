"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExploreCampaignsPage() {
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
        console.error("Error fetching campaigns:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">All Campaigns</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Browse through all active crowdfunding campaigns and support the ones you love.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <span className="loading loading-spinner loading-lg text-emerald-600">Loading all campaigns...</span>
        </div>
      ) : campaigns.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No campaigns found in database.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => {
            const raised = campaign.raised_amount || 0;
            const goal = campaign.funding_goal || campaign.minDonation || 1;
            const percentage = Math.min(((raised / goal) * 100), 100).toFixed(1);

            return (
              <div key={campaign._id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between">
                <div className="relative h-48 bg-slate-100">
                  <span className="absolute top-3 right-3 z-10 bg-amber-400 text-zinc-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {campaign.category || "General"}
                  </span>
                  <img src={campaign.image || campaign.campaign_image_url} alt={campaign.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-2 line-clamp-1">
                      {campaign.title || campaign.campaign_title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 mb-4">
                      {campaign.description}
                    </p>

                    <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-3">
                      <div className="bg-emerald-500 h-full" style={{ width: `${percentage}%` }} />
                    </div>

                    <div className="flex justify-between items-center text-xs text-slate-500 mb-4 pt-2 border-t border-slate-100 dark:border-zinc-800">
                      <span className="font-bold text-slate-800 dark:text-slate-200">${raised} Raised</span>
                      <span className="text-emerald-600 font-semibold">{percentage}%</span>
                    </div>
                  </div>

                  <Link
                    href={`/campaigns/${campaign._id}`}
                    className="block w-full text-center py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs uppercase tracking-wider transition shadow-sm"
                  >
                    See More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}