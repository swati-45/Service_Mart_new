import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    customer: "Rahul",
    rating: 5,
    comment: "Excellent service. Very professional.",
  },
  {
    customer: "Priya",
    rating: 5,
    comment: "Arrived on time and solved the issue quickly.",
  },
];

const ReviewCard = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-900">
          Recent Reviews
        </h2>

      </div>

      <div className="space-y-5">

        {reviews.map((review, index) => (

          <div
            key={index}
            className="border-b border-slate-100 pb-4 last:border-none"
          >

            <div className="mb-2 flex items-center justify-between">

              <h3 className="font-semibold text-slate-900">
                {review.customer}
              </h3>

              <div className="flex items-center gap-1">

                <Star
                  size={16}
                  className="fill-amber-400 text-amber-400"
                />

                <span className="text-sm font-medium">
                  {review.rating}.0
                </span>

              </div>

            </div>

            <p className="text-sm leading-6 text-slate-500">
              {review.comment}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ReviewCard;