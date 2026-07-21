"use client";

import PrivateRoute from "@/components/PrivateRoute";

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
        {/* তোমার ড্যাশবোর্ডের বাকি কোড এখানে থাকবে */}
      </div>
    </PrivateRoute>
  );
} 