import React from "react";
import { Star } from "lucide-react";

const StarRating = ({
  rating,
  count = 5,
  size = 16,
  interactive = false,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(count)].map((_, i) => {
        const fillPercent = Math.max(0, Math.min(100, (rating - i) * 100));
        return (
          <div
            key={i}
            className={`relative ${interactive ? "cursor-pointer" : ""}`}
            onClick={() => interactive && onChange && onChange(i + 1)}
          >
            <Star size={size} className="text-gray-300" />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <Star size={size} className="text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
