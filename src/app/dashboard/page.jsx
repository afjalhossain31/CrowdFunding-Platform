"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useRole from "@/hooks/useRole";

const navByRole = {
  supporter: [
    { label: "Home", href: "/dashboard/supporter-home" },
    { label: "Explore Campaigns", href: "/dashboard/explore-campaigns" },
    { label: "My Contributions", href: "/dashboard/my-contributions" },
    { label: "Purchase Credit", href: "/dashboard/purchase-credit" },
    { label: "Payment History", href: "/dashboard/payment-history" },
  ],
  creator: [
    { label: "Home", href: "/dashboard/creator-home" },
    { label: "Add New Campaign", href: "/dashboard/add-campaign" },
    { label: "My Campaigns", href: "/dashboard/my-campaigns" },
    { label: "Withdrawals", href: "/dashboard/withdrawals" },
    { label: "Payment History", href: "/dashboard/payment-history" },
  ],
  admin: [
    { label: "Home", href: "/dashboard/admin-home" },
    { label: "Manage Users", href: "/dashboard/manage-users" },
    { label: "Manage Campaigns", href: "/dashboard/manage-campaigns" },
    { label: "Withdrawal Requests", href: "/dashboard/withdrawal-requests" },
    { label: "Reports", href: "/dashboard/reports" },
  ],
};

export default function DashboardSidebar() {
  const [role, roleLoading] = useRole();
  const pathname = usePathname();

  if (roleLoading) return <div className="w-64 p-4">Loading menu...</div>;

  const items = navByRole[role] || [];

  return (
    <aside className="w-64 bg-primary text-white min-h-screen p-4 hidden md:block">
      <Link href="/" className="text-xl font-bold block mb-8">FundRise</Link>
      <nav className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
              pathname === item.href ? "bg-white text-primary" : "hover:bg-white/10"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
