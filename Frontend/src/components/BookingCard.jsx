import React from "react";
import Card from "./Card";
import Badge from "./Badge";
import Button from "./Button";
import { Calendar, Clock, User } from "lucide-react";
import { formatCurrency, formatDate } from "../utils/formatters";

const BookingCard = ({
  booking,
  onClick,
  onCancel,
  onRetryPayment,
}) => {
  const statusColors = {
    pending: "warning",
    confirmed: "success",
    in_progress: "info",
    completed: "gray",
    cancelled: "danger",
  };

  return (
    <Card
      hover
      onClick={onClick}
      className="w-full relative"
      padding="p-5"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-500 shrink-0">
            <User size={20} />
          </div>

          <div>
            <h4 className="text-base font-bold leading-tight text-gray-900">
              {booking.serviceName}
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              {booking.provider?.name}
            </p>
          </div>
        </div>

        <Badge
          variant={statusColors[booking.status] || "gray"}
          size="sm"
          className="px-3 py-1.5 font-medium capitalize"
        >
          {booking.status.replace("_", " ")}
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-gray-100 pt-4 text-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={16} />
          <span>{formatDate(booking.bookingDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Clock size={16} />
          <span>{booking.timeSlot}</span>
        </div>

        <div className="col-span-2">
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(booking.payment?.amount || 0)}
          </span>
        </div>
      </div>
{(booking.status === "pending" ||
  booking.status === "confirmed") && (
  <div className="mt-4 flex justify-end gap-3">

    {booking.payment?.status === "pending" && (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onRetryPayment?.(booking);
        }}
      >
        Retry Payment
      </Button>
    )}

    <Button
      variant="danger"
      onClick={(e) => {
        e.stopPropagation();
        onCancel?.(booking._id);
      }}
    >
      Cancel Booking
    </Button>

  </div>
)}
    </Card>
  );
};

export default BookingCard;