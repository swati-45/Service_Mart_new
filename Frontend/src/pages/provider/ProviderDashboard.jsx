import { useEffect, useState } from "react";
import ProviderMetricCards from "../../components/provider/ProviderMetricCards";
import ProviderRecentBookings from "../../components/provider/ProviderRecentBookings";
import ProviderQuickActions from "../../components/provider/ProviderQuickActions";
import api from "../../api/api";
import { useSelector } from "react-redux";

const ProviderDashboard = () => {
  const [loading, setLoading] = useState(true);


  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalEarnings: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
    const user = useSelector((state) => state.auth.user);
   

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get("/providers/dashboard");

        setStats(data.data.stats);
        setRecentBookings(data.data.recentBookings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

    




  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }



  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          Provider Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's an overview of your business.
        </p>
      </div>

      <ProviderMetricCards stats={stats} />

      <ProviderRecentBookings bookings={recentBookings} />

      <ProviderQuickActions />
    </div>
  );
};

export default ProviderDashboard;