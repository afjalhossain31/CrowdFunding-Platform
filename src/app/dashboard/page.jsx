export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column (Takes up 2/3 width on large screens) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Blue Donation Banner */}
        <div className="bg-blue-600 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center shadow-md">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-1">Save our students with</h2>
            <h2 className="text-2xl font-bold">your Donation!</h2>
          </div>
          <button className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition">
            Donate Now
          </button>
        </div>

        {/* Statistic Cards */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistic</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Active Card */}
            <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-sm">
              <p className="text-sm opacity-90 font-medium">Total Donation</p>
              <h4 className="text-3xl font-bold my-2">259</h4>
              <p className="text-xs bg-white/20 inline-block px-2 py-1 rounded">↗ 2.3% Increased last week</p>
            </div>
            
            {/* Inactive Card 1 */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 font-medium">Total Alms</p>
              <h4 className="text-3xl font-bold text-blue-600 my-2">$4,299</h4>
              <p className="text-xs text-blue-500 font-medium">↗ 4.9% Increased last week</p>
            </div>
            
            {/* Inactive Card 2 */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 font-medium">Total Donor</p>
              <h4 className="text-3xl font-bold text-blue-600 my-2">$1,106</h4>
              <p className="text-xs text-red-500 font-medium">↙ 5.1% Downhill this week</p>
            </div>
            
          </div>
        </div>

        {/* Anyone who donates (Table) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Anyone who donates</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="pb-3 font-medium text-gray-400">Name</th>
                  <th className="pb-3 font-medium text-gray-400">Campaign</th>
                  <th className="pb-3 font-medium text-gray-400">Start</th>
                  <th className="pb-3 font-medium text-gray-400">End</th>
                  <th className="pb-3 font-medium text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-4 font-medium text-gray-800">Julio Payne</td>
                  <td className="py-4">Disaster</td>
                  <td className="py-4">19 May, 09 AM</td>
                  <td className="py-4">19 May, 10 AM</td>
                  <td className="py-4 text-blue-600 font-medium">Completed</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium text-gray-800">Ares Hunter</td>
                  <td className="py-4">Education</td>
                  <td className="py-4">21 May, 07 AM</td>
                  <td className="py-4">21 May, 07 AM</td>
                  <td className="py-4 text-blue-600 font-medium">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Column (Takes up 1/3 width on large screens) */}
      <div className="space-y-6">
        
        {/* Wallet Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Wallet</h3>
          <div className="space-y-4">
            
            {/* Wallet Item 1 */}
            <div className="flex justify-between items-center border-b border-gray-50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold">💳</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Credit bank</p>
                  <p className="text-xs text-gray-400">Visa bank</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Balance</p>
                <p className="text-sm font-bold text-blue-600">$8,531.80</p>
              </div>
            </div>

            {/* Wallet Item 2 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold">🏦</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Bank</p>
                  <p className="text-xs text-gray-400">WeBank</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Balance</p>
                <p className="text-sm font-bold text-blue-600">$7,970.80</p>
              </div>
            </div>

          </div>
        </div>

        {/* Donation Categories Dummy Chart Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Donation Categories</h3>
          <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm">Donation Chart Here</p>
          </div>
        </div>

      </div>
    </div>
  );
}