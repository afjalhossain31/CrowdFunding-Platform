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
    category: "technology",
    goal: "",
    deadline: "",
    image: "",
    description: "",
  });

  // ইনপুট পরিবর্তনের হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ফর্ম সাবমিট করার ফাংশন
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    // ডাটাবেসে পাঠানোর জন্য ডেটা প্রস্তুত করা
    const newCampaign = {
      ...formData,
      goal: Number(formData.goal),
      creatorName: user?.displayName || "Anonymous",
      creatorEmail: user?.email,
      raisedAmount: 0, // শুরুতে শূন্য থাকবে
      status: "active",
      createdAt: new Date().toISOString(),
    };

    try {
      // আপনার ব্যাকএন্ড API এর লিংক
      await axios.post("http://localhost:5000/campaigns", newCampaign);
      
      setMessage({ text: "Campaign added successfully!", type: "success" });
      
      // ফর্ম রিসেট এবং কিছুক্ষণ পর মোডাল বন্ধ করা
      setTimeout(() => {
        setIsModalOpen(false);
        setFormData({ title: "", category: "technology", goal: "", deadline: "", image: "", description: "" });
        setMessage({ text: "", type: "" });
      }, 2000);

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
            className="bg-white text-emerald-600 px-6 py-2.5 rounded-lg font-bold hover:bg-emerald-50 transition shadow-sm"
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
            
            <div className="bg-slate-800 text-white p-5 rounded-2xl shadow-sm border border-slate-700">
              <p className="text-sm text-slate-300 font-medium">Total Amount Raised</p>
              <h4 className="text-3xl font-bold my-2 text-emerald-400">8,500</h4>
              <p className="text-xs bg-slate-700 inline-block px-2 py-1 rounded text-slate-300">Platform Credits</p>
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
                  <th className="py-3 px-2 font-semibold text-slate-500">Contribution</th>
                  <th className="py-3 px-2 font-semibold text-slate-500 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                  <td className="py-4 px-2 font-medium text-slate-800">Julio Payne</td>
                  <td className="py-4 px-2">Solar-powered water pump</td>
                  <td className="py-4 px-2 font-semibold text-emerald-600">500 Credits</td>
                  <td className="py-4 px-2 text-right">
                    <button className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md font-semibold hover:bg-emerald-100 mr-2">Review</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Creator Total Earnings Section */}
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
            
            <button className="w-full mt-2 bg-slate-900 text-white py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition">
              Request Withdrawal
            </button>
          </div>
        </div>

        {/* Quick Guidelines */}
        <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
          <h3 className="text-md font-bold text-emerald-800 mb-2">Withdrawal Rules</h3>
          <ul className="text-sm text-emerald-700 space-y-2">
            <li>• Minimum <strong>200 credits</strong> required.</li>
            <li>• 1 Dollar will be issued for every 20 credits.</li>
            <li>• Processed after Admin approval.</li>
          </ul>
        </div>
      </div>

      {/* --- ADD NEW CAMPAIGN MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-slate-800">Add New Campaign</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* Messages */}
              {message.text && (
                <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {message.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Title</label>
                  <input 
                    type="text" required name="title" value={formData.title} onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Clean Water Initiative"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select 
                    name="category" value={formData.category} onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="technology">Technology</option>
                    <option value="health">Health & Medical</option>
                    <option value="community">Community Causes</option>
                    <option value="education">Education</option>
                  </select>
                </div>

                {/* Goal Amount */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Goal Amount (Credits)</label>
                  <input 
                    type="number" required min="10" name="goal" value={formData.goal} onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. 5000"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Deadline Date</label>
                  <input 
                    type="date" required name="deadline" value={formData.deadline} onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image URL</label>
                  <input 
                    type="url" required name="image" value={formData.image} onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Description */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea 
                    required rows="4" name="description" value={formData.description} onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Describe why this campaign is important..."
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  ) : "Create Campaign"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}