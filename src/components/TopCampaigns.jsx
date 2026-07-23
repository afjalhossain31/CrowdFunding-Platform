"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

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
        <span className="loading loading-spinner loading-lg text-emerald-500"></span>
      </div>
    );
  }

  return (
    <section className="bg-slate-50 w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Top Fundraising Campaigns
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            Discover the most successful campaigns and support meaningful causes.
          </p>
        </div>

        {campaigns.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No campaigns available at the moment.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {campaigns.map((campaign, index) => {
              
              const goal = campaign.minDonation || campaign.funding_goal || 1;
              const raised = campaign.raised_amount || 0;
              const progressPercentage = Math.min((raised / goal) * 100, 100).toFixed(2);

              return (
                <motion.div
                  key={campaign._id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }} 
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
                >
                  {/* Image Section - উচ্চতা কমানো হয়েছে h-44 */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={campaign.image || campaign.campaign_image_url}
                      alt={campaign.title || campaign.campaign_title}
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute -bottom-4 left-5 w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-slate-200 shadow-sm">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${campaign.creator_name || "User"}&background=random`} 
                        alt="creator"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Card Body - প্যাডিং ও ফন্ট সাইজ কমানো হয়েছে */}
                  <div className="pt-6 pb-5 px-5 flex-1 flex flex-col">
                    
                    <div className="text-xs text-slate-400 mb-1.5">
                      by <span className="text-emerald-500 font-medium">{campaign.creator_name || "Jonas Smith"}</span>
                    </div>

                    <Link href={`/campaigns/${campaign._id}`}>
                      <h3 className="text-lg font-bold text-slate-800 mb-5 leading-tight hover:text-emerald-600 transition-colors line-clamp-2">
                        {campaign.title || campaign.campaign_title}
                      </h3>
                    </Link>

                    <div className="flex-grow"></div>

                    <div>
                      <div className="w-full bg-slate-100 h-1 rounded-full mb-2.5 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-baseline mb-0.5">
                        <p className="text-base font-bold text-slate-800">${raised.toLocaleString()}</p>
                        <p className="text-xs font-medium text-slate-700">{progressPercentage}%</p>
                      </div>
                      <p className="text-[11px] text-slate-400 mb-4">
                        raised of ${goal.toLocaleString()}
                      </p>

                      <div className="w-full h-[1px] bg-slate-100 mb-3"></div>

                      <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-500" />
                          <span>0 Days to go</span>
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
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}