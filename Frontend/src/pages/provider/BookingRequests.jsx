import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Phone,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";

import api from "../../api/api";



const BookingRequests = () => {

  const [requests, setRequests] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchRequests();
}, []);

const fetchRequests = async () => {
  try {
    const { data } = await api.get("/bookings/provider");

    setRequests(data.data.bookings || []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const updateStatus = async (id, status) => {
  try {
    await api.patch(`/bookings/${id}/status`, {
      status,
    });

    await fetchRequests();
  } catch (err) {
    console.error(err);
  }
};

if (loading) {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <h2 className="text-2xl font-semibold">
        Loading...
      </h2>
    </div>
  );
}


  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Booking Requests
        </h1>

        <p className="mt-2 text-slate-500">
          Review and respond to customer booking requests.
        </p>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 px-6 py-4 font-semibold text-slate-700">

          <div>Customer</div>
          <div>Service</div>
          <div>Date</div>
          <div>Time</div>
          <div>Location</div>
          <div>Phone</div>
          <div className="text-center">Action</div>

        </div>

        {requests.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-7 items-center border-b border-slate-100 px-6 py-5 transition hover:bg-slate-50"
          >
            <div className="font-semibold text-slate-900">
              {item.address.fullName}
            </div>

            <div>{item.serviceName}</div>

            <div className="flex items-center gap-2 text-slate-600">
              <Calendar size={16} />
             {new Date(item.bookingDate).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <Clock size={16} />
              {item.timeSlot}
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <MapPin size={16} />
             {item.address.area},
                    {" "}
                    {item.address.city}
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <Phone size={16} />
              {item.address.mobile}
            </div>

            <div className="flex justify-center gap-3">
             


<div className="flex justify-center gap-3">
  {item.status === "pending" && (
    <>
      <button
        onClick={() => updateStatus(item._id, "confirmed")}
        className="rounded-xl bg-green-100 p-3 text-green-600 transition hover:bg-green-200"
        title="Confirm"
      >
        <CheckCircle2 size={22} />
      </button>

      <button
        onClick={() => updateStatus(item._id, "cancelled")}
        className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"
        title="Cancel"
      >
        <XCircle size={22} />
      </button>
    </>
  )}

  {item.status === "confirmed" && (
    <button
      onClick={() => updateStatus(item._id, "in_progress")}
      className="rounded-xl bg-yellow-100 px-4 py-2 font-medium text-yellow-700 transition hover:bg-yellow-200"
    >
      Start Work
    </button>
  )}

  {item.status === "in_progress" && (
    <button
      onClick={() => updateStatus(item._id, "completed")}
      className="rounded-xl bg-blue-100 px-4 py-2 font-medium text-blue-700 transition hover:bg-blue-200"
    >
      Mark Completed
    </button>
  )}

  {item.status === "completed" && (
    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
      Completed
    </span>
  )}

  {item.status === "cancelled" && (
    <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
      Cancelled
    </span>
  )}
</div>




            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingRequests;