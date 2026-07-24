import { Link } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";

    case "accepted":
      return "bg-blue-100 text-blue-700";

    case "completed":
      return "bg-green-100 text-green-700";

    case "cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const ProviderRecentBookings = ({ bookings = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-md mt-8 overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-xl font-semibold">
          Recent Bookings
        </h2>

        <Link
          to="/provider/bookings"
          className="text-blue-600 font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          No bookings found.
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3">Customer</th>
              <th className="text-left px-6 py-3">Service</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Amount</th>
              <th className="text-left px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.slice(0, 5).map((booking) => (
              <tr
                key={booking._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {booking.user?.name || "Customer"}
                </td>

                <td className="px-6 py-4">
                  {booking.serviceName}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    booking.bookingDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                
                 ₹{booking.payment?.amount}
               
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default  ProviderRecentBookings;