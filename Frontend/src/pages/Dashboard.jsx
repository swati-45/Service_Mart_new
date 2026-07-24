import React from "react";
import PageWrapper from "../components/PageWrapper";
import MetricCards from "./components/MetricCards";
import BookingsList from "./components/BookingList";
import QuickBook from "./components/QuickBooks";
import useAuth from "../hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <PageWrapper title="Dashboard" className="bg-[#fafafa]">
      <div className="bg-primary pt-10 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">
            Hello, {user?.name?.split(" ")[0] || "User"}! 👋
          </h1>
          <p className="text-blue-100 mt-2">
            Welcome to your ServiceMart dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 space-y-8 pb-12">
        <MetricCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BookingsList />
          </div>
          <div className="lg:col-span-1">
            <QuickBook />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
