"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("http://localhost:5000/campaigns");

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          All Campaigns ({campaigns.length})
        </h1>

        {campaigns.length === 0 ? (
          <p className="text-center text-gray-500">
            No campaigns found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {campaign.image && (
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-5">
                  <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded">
                    {campaign.category}
                  </span>

                  <h2 className="text-xl font-bold mt-3">
                    {campaign.title}
                  </h2>

                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {campaign.description}
                  </p>

                  <div className="flex justify-between items-center mt-5">
                    <div>
                      <p className="text-sm text-gray-500">
                        Minimum Donation
                      </p>
                      <p className="font-bold text-indigo-600">
                        ${campaign.minDonation}
                      </p>
                    </div>

                    <Link
                      href={`/campaigns/${campaign._id}`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                      See More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}