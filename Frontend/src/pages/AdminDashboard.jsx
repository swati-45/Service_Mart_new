import React from "react";
import { Users, Briefcase, IndianRupee, Activity } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import Table from "../components/Table";
import Badge from "../components/Badge";

const AdminDashboard = () => {
  const recentBookings = [
    {
      id: "#1029",
      user: "Amit Patel",
      service: "AC Repair",
      amount: 499,
      status: "Confirmed",
    },
    {
      id: "#1028",
      user: "Sneha Rao",
      service: "Plumbing",
      amount: 249,
      status: "Completed",
    },
    {
      id: "#1027",
      user: "Rahul Sharma",
      service: "Electrician",
      amount: 899,
      status: "Completed",
    },
    {
      id: "#1026",
      user: "Priya Singh",
      service: "Deep Clean",
      amount: 1499,
      status: "Cancelled",
    },
  ];

  const columns = [
    {
      header: "Order ID",
      accessor: "id",
      className: "font-mono text-gray-500",
    },
    { header: "User", accessor: "user" },
    { header: "Service", accessor: "service" },
    { header: "Amount", accessor: "amount", render: (val) => `₹${val}` },
    {
      header: "Status",
      accessor: "status",
      render: (val) => (
        <Badge
          variant={
            val === "Confirmed"
              ? "info"
              : val === "Completed"
                ? "success"
                : "danger"
          }
        >
          {val}
        </Badge>
      ),
    },
  ];

  return (
    <PageWrapper title="Admin Dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Bookings
              </p>
              <p className="text-2xl font-bold">1,248</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Active Providers
              </p>
              <p className="text-2xl font-bold">86</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <IndianRupee size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Monthly Revenue
              </p>
              <p className="text-2xl font-bold">₹1.2M</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">New Users</p>
              <p className="text-2xl font-bold">342</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
            <Table columns={columns} data={recentBookings} />
          </div>
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <Card padding="p-0">
              <div className="divide-y">
                <button className="w-full flex justify-between p-4 hover:bg-gray-50">
                  <span className="font-medium text-gray-700">
                    Manage Providers
                  </span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    3 Pending
                  </span>
                </button>
                <button className="w-full flex justify-between p-4 hover:bg-gray-50">
                  <span className="font-medium text-gray-700">
                    Manage Bookings
                  </span>
                </button>
                <button className="w-full flex justify-between p-4 hover:bg-gray-50">
                  <span className="font-medium text-gray-700">
                    Platform Settings
                  </span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AdminDashboard;
