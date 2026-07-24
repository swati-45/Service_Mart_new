import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  Wallet,
  Star,
  ShieldCheck,
} from "lucide-react";
import Card from "../../components/Card";
import api from "../../api/api";

const MetricCards = () => {
  const [stats, setStats] = useState({
    total: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/bookings/my");

        const bookings = data.data.bookings || [];

        setStats({
          total: bookings.length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card hover className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-blue-100 text-primary flex items-center justify-center">
          <CalendarCheck size={24} />
        </div>

        <div>
          <p className="text-sm text-gray-500 font-medium">
            Total Bookings
          </p>

          <p className="text-2xl font-bold">
            {stats.total}
          </p>
        </div>
      </Card>

      <Card hover className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
          <Wallet size={24} />
        </div>

        <div>
          <p className="text-sm text-gray-500 font-medium">
            Wallet Balance
          </p>

          <p className="text-2xl font-bold">₹0</p>
        </div>
      </Card>

      <Card hover className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
          <Star size={24} className="fill-yellow-600" />
        </div>

        <div>
          <p className="text-sm text-gray-500 font-medium">
            Avg Rating Given
          </p>

          <p className="text-2xl font-bold">--</p>
        </div>
      </Card>

      <Card hover className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
          <ShieldCheck size={24} />
        </div>

        <div>
          <p className="text-sm text-gray-500 font-medium">
            Guarantee Status
          </p>

          <p className="text-lg font-bold text-green-600">
            Active
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MetricCards;