import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-sans">
      {/* Sidebar - Fixed to the left */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar matching the image */}
        <header className="h-20 px-8 flex items-center justify-between bg-[#f8f9fc]">
          <h2 className="text-xl font-semibold text-gray-800">Welcome Let's Donate</h2>
          
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-white border-none rounded-full px-4 py-2 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-sm"
              />
            </div>
            
            {/* Notification & Messages Icons */}
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-gray-600 transition">
                🔔
              </button>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-gray-600 transition">
                ✉️
              </button>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full shadow-sm cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.pravatar.cc/150?img=11" alt="User Profile" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium text-gray-700 pr-2">Jimmy Martin</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content Area */}
        <main className="flex-1 overflow-y-auto p-8 pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}