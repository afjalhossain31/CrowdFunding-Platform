"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import axios from "axios";
import { X, Loader2 } from "lucide-react";

export default function DashboardOverview() {
  const { user } = useContext(AuthContext);
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Health",
    minDonation: "",
    funding_goal: "",
    deadline: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "", error: "" });

    const minDonationNum = Number(formData.minDonation);
    const goalNum = Number(formData.funding_goal);

    if (minDonationNum > goalNum) {
      setMessage({ text: "Minimum donation amount cannot be greater than funding goal.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    const newCampaign = {
      title: formData.title,
      campaign_title: formData.title,
      category: formData.category,
      minDonation: minDonationNum,
      funding_goal: goalNum,
      deadline: formData.deadline,
      image: formData.image,
      campaign_image_url: formData.image,
      description: formData.description,
      creator_name: user?.displayName || "Anonymous Creator",
      creator_email: user?.email || "creator@gmail.com",
      creator_image: user?.photoURL || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      raised_amount: 0,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:5000/campaigns", newCampaign);
      
      setMessage({ text: "Campaign added successfully!", type: "success" });
      
      setTimeout(() => {
        setIsModalOpen(false);
        setFormData({ title: "", category: "Health", minDonation: "", funding_goal: "", deadline: "", image: "", description: "" });
        setMessage({ text: "", type: "" });
      }, 1500);

    } catch (error) {
      console.error("Failed to add campaign:", error);
      setMessage({ text: "Failed to add campaign. Try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
      
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Crowdfund Banner */}
        <div className="bg-emerald-600 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center shadow-md">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-1">Launch your dream project</h2>
            <p className="text-emerald-100 font-medium">Get funded by supporters worldwide on Crowdfund.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-emerald-600 px-6 py-2.5 rounded-lg font-bold hover:bg-emerald-50 transition shadow-sm cursor-pointer"
          >
            + Add New Campaign
          </button>
        </div>

        {/* Creator Dashboard States */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500 font-medium">Total Campaign Count</p>
              <h4 className="text-3xl font-bold text-slate-800 my-2">12</h4>
              <p className="text-xs text-emerald-500 font-medium">Campaigns launched by you</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500 font-medium">Active Campaigns</p>
              <h4 className="text-3xl font-bold text-slate-800 my-2">5</h4>
              <p className="text-xs text-green-500 font-medium">Deadline not passed</p>
            </div>
            <div className="bg-emerald-600 text-white p-5 rounded-2xl shadow-sm">
              <p className="text-sm opacity-90 font-medium">Total Amount Raised</p>
              <h4 className="text-3xl font-bold my-2">8,500</h4>
              <p className="text-xs bg-white/20 inline-block px-2 py-1 rounded">Platform Credits</p>
            </div>
          </div>
        </div>

        {/* Contributions To Review */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800">Contributions To Review</h3>
            <span className="text-sm text-emerald-600 font-medium cursor-pointer hover:underline">View All</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 bg-slate-50/50">
                <tr>
                  <th className="py-3 px-2 font-semibold text-slate-500">Supporter Name</th>
                  <th className="py-3 px-2 font-semibold text-slate-500">Campaign Title</th>
                  <th className="py-3 px-2 font-semibold text-slate-500">Contribution Amount</th>
                  <th className="py-3 px-2 font-semibold text-slate-500 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                  <td className="py-4 px-2 font-medium text-slate-800">Julio Payne</td>
                  <td className="py-4 px-2">Solar-powered water pump</td>
                  <td className="py-4 px-2 font-semibold text-emerald-600">500 Credits</td>
                  <td className="py-4 px-2 text-right">
                    <button className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md font-semibold hover:bg-emerald-100 mr-2 cursor-pointer">Review</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Creator Earnings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 text-lg">🪙</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Raised Credits</p>
                  <p className="text-xs text-slate-500">Available to convert</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-amber-500">8,500</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 text-lg">💵</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Withdrawal Amount</p>
                  <p className="text-xs text-slate-500">20 Credits = $1</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-600">$425.00</p>
              </div>
            </div>
            <button className="w-full mt-2 bg-slate-900 text-white py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition cursor-pointer">
              Request Withdrawal
            </button>
          </div>
        </div>
        <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
          <h3 className="text-md font-bold text-emerald-800 mb-2">Withdrawal Rules</h3>
          <ul className="text-sm text-emerald-700 space-y-2">
            <li>• Minimum <strong>200 credits</strong> required for withdrawal.</li>
            <li>• 1 Dollar will be issued for every 20 credits.</li>
            <li>• Withdrawals are processed after Admin approval.</li>
          </ul>
        </div>
      </div>

      {/* --- ADD NEW CAMPAIGN MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-slate-800">Start a New Campaign</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {message.text && (
                <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {message.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Campaign Title */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Campaign Title</label>
                  <input 
                    type="text" required name="title" value={formData.title} onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
                    placeholder="e.g. Free Medical Camp for Rural Families"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                  <select 
                    name="category" value={formData.category} onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Health">Health</option>
                    <option value="Medical">Medical</option>
                    <option value="Technology">Technology</option>
                    <option value="Community">Community Causes</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                {/* Minimum Donation Amount */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Minimum Donation Amount ($)</label>
                  <input 
                    type="number" required min="1" name="minDonation" value={formData.minDonation} onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
                    placeholder="e.g. 30"
                  />
                </div>

                {/* Funding Goal */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Funding Goal ($)</label>
                  <input 
                    type="number" required min="10" name="funding_goal" value={formData.funding_goal} onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
                    placeholder="e.g. 8000"
                  />
                </div>

                {/* Deadline Date */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Deadline Date</label>
                  <input 
                    type="date" required name="deadline" value={formData.deadline} onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors cursor-pointer"
                  />
                </div>

                {/* Cover Image URL */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Image URL</label>
                  <input 
                    type="url" required name="image" value={formData.image} onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
                    placeholder="https://images.pexels.com/..."
                  />
                </div>

                {/* Description */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                  <textarea 
                    required rows="4" name="description" value={formData.description} onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
                    placeholder="Write details about your campaign story and goals..."
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" disabled={isSubmitting}
                  className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md cursor-pointer"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  ) : "Add Campaign"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}