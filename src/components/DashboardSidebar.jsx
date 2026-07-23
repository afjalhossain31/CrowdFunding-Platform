"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useRole from "@/hooks/useRole";

const navByRole = {
  supporter: [
    { label: "Overview", href: "/dashboard/supporter-home" },
    { label: "Explore Campaigns", href: "/dashboard/explore-campaigns" },
    { label: "My Contributions", href: "/dashboard/my-contributions", badge: 5 },
    { label: "Purchase Credit", href: "/dashboard/purchase-credit" },
    { label: "Payment History", href: "/dashboard/payment-history" },
  ],
  creator: [
    { label: "Overview", href: "/dashboard/creator-home" },
    { label: "Add New Campaign", href: "/dashboard/add-campaign" },
    { label: "My Campaigns", href: "/dashboard/my-campaigns" },
    { label: "Withdrawals", href: "/dashboard/withdrawals" },
    { label: "Payment History", href: "/dashboard/payment-history" },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin-home" },
    { label: "Manage Users", href: "/dashboard/manage-users" },
    { label: "Manage Campaigns", href: "/dashboard/manage-campaigns", badge: 2 },
    { label: "Withdrawal Requests", href: "/dashboard/withdrawal-requests" },
    { label: "Reports", href: "/dashboard/reports" },
  ],
};

const settingsLinks = [
  { label: "Settings", href: "/dashboard/settings" },
  { label: "Help", href: "/dashboard/help" },
  { label: "About", href: "/dashboard/about" },
];

export default function DashboardSidebar() {
  const { role, loading } = useRole();
  const pathname = usePathname();

  if (loading) return <div className="w-64 p-4 text-slate-500">Loading menu...</div>;

  const items = navByRole[role] || [];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen flex flex-col hidden md:flex">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6">
        <Link href="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
          {/* Simple Icon matching the image */}
          <div className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-sm">F</div>
          FundRise
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {/* General Section */}
        <div className="mb-6">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">General</p>
          <nav className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Placeholder for Icon (You can use react-icons here) */}
                    <div className={`w-5 h-5 rounded ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className={`text-xs w-5 h-5 flex items-center justify-center rounded-full ${isActive ? 'bg-white text-blue-600' : 'bg-red-500 text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Settings Section */}
        <div>
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Settings</p>
          <nav className="space-y-1">
            {settingsLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <div className="w-5 h-5 rounded bg-gray-200"></div>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}