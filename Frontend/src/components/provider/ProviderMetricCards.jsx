import {
  CalendarCheck,
  Clock,
  IndianRupee,
  CheckCircle,
} from "lucide-react";

const ProviderMetricCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarCheck,
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      value: stats.pendingBookings,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Completed",
      value: stats.completedBookings,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Total Earnings",
      value: `₹${stats.totalEarnings}`,
      icon: IndianRupee,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} w-14 h-14 rounded-full flex items-center justify-center`}
              >
                <Icon className="text-white" size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProviderMetricCards;