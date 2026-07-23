"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // সার্ভার থেকে সব ক্যাম্পেইন ফেচ করা
    axios.get("http://localhost:5000/campaigns")
      .then((res) => {
        setCampaigns(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch campaigns:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-primary py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-slate-100">
          All Campaigns ({campaigns.length})
        </h1>

        {campaigns.length === 0 ? (
          <p className="text-center text-slate-600 dark:text-slate-400">No campaigns found. Create one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div 
                key={campaign._id} 
                className="bg-white dark:bg-dark-secondary rounded-lg shadow-md overflow-hidden border border-slate-200 dark:border-dark-tertiary flex flex-col justify-between"
              >
                <div>
                  {campaign.image && (
                    <img 
                      src={campaign.image} 
                      alt={campaign.title} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 px-2.5 py-1 rounded">
                      {campaign.category}
                    </span>
                    <h3 className="text-xl font-bold mt-2 text-slate-800 dark:text-slate-100">
                      {campaign.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 line-clamp-2">
                      {campaign.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between mt-4">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Min Donation</p>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">${campaign.minDonation}</p>
                  </div>
                  <Link 
                    href={`/campaigns/${campaign._id}`}
                    className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}