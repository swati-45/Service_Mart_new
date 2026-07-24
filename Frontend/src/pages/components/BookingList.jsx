import React, { useEffect, useState } from "react";
import BookingCard from "../../components/BookingCard";
import Skeleton from "../../components/Skeleton";
import EmptyState from "../../components/EmptyState";
import { Calendar } from "lucide-react";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slice/uiSlice";
import api from "../../api/api";

const BookingsList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    setLoading(true);

    try {
      const { data } = await api.get("/bookings/my");

      const bookings = data.data.bookings || [];

      bookings.sort(
        (a, b) =>
          new Date(b.bookingDate) -
          new Date(a.bookingDate)
      );

      setBookings(bookings);
    } catch (err) {
      console.error(err);

      dispatch(
        showToast({
          type: "error",
          message: "Failed to load bookings",
        })
      );
    } finally {
      setLoading(false);
    }
  };



  const handleCancel = async (id) => {
    try {
      await api.patch(`/bookings/${id}/cancel`);

      dispatch(
        showToast({
          type: "success",
          message: "Booking cancelled successfully",
        })
      );

      fetchBookings();
    } catch (err) {
      console.error(err);

      dispatch(
        showToast({
          type: "error",
          message:
            err.response?.data?.message ||
            "Failed to cancel booking",
        })
      );
    }
  };


  const retryPayment = async (booking) => {
  try {
    const { data } = await api.post("/payment/retry", {
      bookingId: booking._id,
    });

    const { order, key } = data.data;

    const options = {
      key,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "ServiceMart",

      handler: async function (response) {
        await api.post("/payment/verify", response);

        dispatch(
          showToast({
            type: "success",
            message: "Payment Successful",
          })
        );

        fetchBookings(); // Refresh list after payment
      },

      modal: {
        ondismiss: function () {
          dispatch(
            showToast({
              type: "warning",
              message: "Payment cancelled",
            })
          );
        },
      },

      theme: {
        color: "#2563eb",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", () => {
      dispatch(
        showToast({
          type: "error",
          message: "Payment Failed",
        })
      );
    });

    razorpay.open();
  } catch (err) {
    console.error(err);

    dispatch(
      showToast({
        type: "error",
        message: "Unable to retry payment",
      })
    );
  }
};

  useEffect(() => {
    fetchBookings();
  }, []);

  const upcoming = bookings.filter(
    (booking) =>
      booking.status === "pending" ||
      booking.status === "confirmed" ||
      booking.status === "in_progress"
  );

  const past = bookings.filter(
    (booking) =>
      booking.status === "completed" ||
      booking.status === "cancelled"
  );


  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-xl font-bold">
            Upcoming Bookings
          </h2>

          <Skeleton className="mb-4 h-32" variant="card" />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">
            Past Bookings
          </h2>

          <Skeleton className="h-32" variant="card" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upcoming */}

      <div>
        <h2 className="mb-4 text-xl font-bold">
          Upcoming Bookings
        </h2>

        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {upcoming.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancel}
                onRetryPayment={retryPayment}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Calendar}
            title="No upcoming bookings"
            description="You don't have any upcoming bookings."
          />
        )}
      </div>

      {/* Past */}

      <div>
        <h2 className="mb-4 text-xl font-bold">
          Past Bookings
        </h2>

        {past.length > 0 ? (
          <div className="flex flex-col gap-4">
            {past.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancel}
                onRetryPayment={retryPayment}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Calendar}
            title="No booking history"
            description="Completed and cancelled bookings will appear here."
          />
        )}
      </div>
    </div>
  );
};

export default BookingsList;