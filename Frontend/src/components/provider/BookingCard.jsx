import React from "react";
import { Clock3, MapPin } from "lucide-react";

const bookings = [
  {
    customer: "Amit Sharma",
    service: "AC Repair",
    time: "09:00 AM",
    address: "Varanasi",
  },
  {
    customer: "Rohit Singh",
    service: "Plumbing",
    time: "11:30 AM",
    address: "BHU Campus",
  },
  {
    customer: "Ankit Verma",
    service: "Electrician",
    time: "03:00 PM",
    address: "Lanka",
  },
];

const BookingCard = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-slate-900">
          Today's Bookings
        </h2>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
          {bookings.length} Today
        </span>

      </div>

      <div className="space-y-4">

        {bookings.map((booking, index) => (

          <div
            key={index}
            className="rounded-2xl border border-slate-100 p-4 transition hover:border-blue-200 hover:bg-slate-50"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-slate-900">
                  {booking.customer}
                </h3>

                <p className="text-sm text-slate-500">
                  {booking.service}
                </p>

              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-600">
                Upcoming
              </span>

            </div>

            <div className="mt-3 flex items-center gap-6 text-sm text-slate-500">

              <div className="flex items-center gap-2">
                <Clock3 size={16} />
                {booking.time}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {booking.address}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default BookingCard;