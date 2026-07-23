"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TopCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("http://localhost:5000/campaigns/top");

        if (!res.ok) {
          throw new Error("Failed to fetch campaigns");
        }

        const data = await res.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching top campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          Top Fundraising Campaigns
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
          Discover the most successful campaigns and support meaningful causes.
        </p>
      </div>

      {campaigns.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-10">
          No campaigns available at the moment.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-zinc-800 flex flex-col justify-between"
            >
              {/* Campaign Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-zinc-800">
                <img
                  src={campaign.image || campaign.campaign_image_url}
                  alt={campaign.title || campaign.campaign_title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-amber-400 text-zinc-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {campaign.category || "General"}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-1">
                    {campaign.title || campaign.campaign_title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 mb-6">
                    {campaign.description}
                  </p>
                </div>

                <div>
                  {/* Donation & Raised Info */}
                  <div className="flex justify-between items-center mb-6 pt-4 border-t border-slate-100 dark:border-zinc-800 text-xs">
                    <div>
                      <p className="text-gray-400">Goal / Min</p>
                      <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                        ${campaign.minDonation || campaign.funding_goal || 0}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-400">Raised</p>
                      <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        ${campaign.raised_amount || 0}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/campaigns/${campaign._id}`}
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl transition-all font-semibold text-xs uppercase tracking-wider shadow-sm active:scale-95"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}