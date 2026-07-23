export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column (Takes up 2/3 width on large screens) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Crowdfund Banner */}
        <div className="bg-blue-600 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center shadow-md">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-1">Launch your dream project</h2>
            <p className="text-blue-100 font-medium">Get funded by supporters worldwide on Crowdfund.</p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition shadow-sm">
            + Add New Campaign
          </button>
        </div>

        {/* Creator Dashboard States (As per assessment requirements) */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 font-medium">Total Campaign Count</p>
              <h4 className="text-3xl font-bold text-gray-800 my-2">12</h4>
              <p className="text-xs text-blue-500 font-medium">Campaigns launched by you</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 font-medium">Active Campaigns</p>
              <h4 className="text-3xl font-bold text-gray-800 my-2">5</h4>
              <p className="text-xs text-green-500 font-medium">Deadline not passed</p>
            </div>
            
            <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-sm">
              <p className="text-sm opacity-90 font-medium">Total Amount Raised</p>
              <h4 className="text-3xl font-bold my-2">8,500</h4>
              <p className="text-xs bg-white/20 inline-block px-2 py-1 rounded">Platform Credits</p>
            </div>
            
          </div>
        </div>

        {/* Contributions To Review (As per assessment requirements) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Contributions To Review</h3>
            <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">View All</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-100 bg-gray-50/50">
                <tr>
                  <th className="py-3 px-2 font-semibold text-gray-500">Supporter Name</th>
                  <th className="py-3 px-2 font-semibold text-gray-500">Campaign Title</th>
                  <th className="py-3 px-2 font-semibold text-gray-500">Contribution Amount</th>
                  <th className="py-3 px-2 font-semibold text-gray-500 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                  <td className="py-4 px-2 font-medium text-gray-800">Julio Payne</td>
                  <td className="py-4 px-2">Solar-powered water pump</td>
                  <td className="py-4 px-2 font-semibold text-blue-600">500 Credits</td>
                  <td className="py-4 px-2 text-right">
                    <button className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md font-semibold hover:bg-blue-100 mr-2">Review</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition">
                  <td className="py-4 px-2 font-medium text-gray-800">Ares Hunter</td>
                  <td className="py-4 px-2">Education for rural kids</td>
                  <td className="py-4 px-2 font-semibold text-blue-600">200 Credits</td>
                  <td className="py-4 px-2 text-right">
                    <button className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md font-semibold hover:bg-blue-100 mr-2">Review</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Column (Takes up 1/3 width on large screens) */}
      <div className="space-y-6">
        
        {/* Creator Total Earnings Section (As per logic: 20 credits = 1 dollar) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Creator Earnings</h3>
          <div className="space-y-4">
            
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-lg">🪙</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Raised Credits</p>
                  <p className="text-xs text-gray-500">Available to convert</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">8,500</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 text-lg">💵</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Withdrawal Amount</p>
                  <p className="text-xs text-gray-500">20 Credits = $1</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">$425.00</p>
              </div>
            </div>
            
            <button className="w-full mt-2 bg-gray-900 text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition">
              Request Withdrawal
            </button>

          </div>
        </div>

        {/* Quick Guidelines / Notice */}
        <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-md font-bold text-blue-800 mb-2">Withdrawal Rules</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Minimum <strong>200 credits</strong> required for withdrawal.</li>
            <li>• 1 Dollar will be issued for every 20 credits.</li>
            <li>• Withdrawals are processed after Admin approval.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}