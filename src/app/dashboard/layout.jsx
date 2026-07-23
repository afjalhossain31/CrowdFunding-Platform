import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-sans">
      {/* Sidebar - Fixed to the left */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar updated for Crowdfund */}
        <header className="h-20 px-8 flex items-center justify-between bg-[#f8f9fc]">
          <h2 className="text-xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">Crowdfund</span>
          </h2>
          
          <div className="flex items-center gap-6">
            
            {/* Available Credits Display (As per requirement) */}
            <div className="hidden md:flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm border border-blue-100">
              🪙 Available Credits: 120
            </div>
            
            {/* Notification Icon */}
            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-gray-600 transition">
                🔔
                {/* Notification Badge */}
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full shadow-sm cursor-pointer border border-gray-100">
              <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.pravatar.cc/150?img=11" alt="User Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-sm font-semibold text-gray-700 leading-tight">Jimmy Martin</span>
                <span className="text-[10px] text-gray-500 font-medium">Creator</span>
              </div>
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