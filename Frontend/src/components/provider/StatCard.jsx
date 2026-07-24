import React from "react";
import { ArrowUpRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
}) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    violet: "bg-violet-50 text-violet-600",
  };

  
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colors[color]}`}
        >
          <Icon size={28} />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-600">
        <ArrowUpRight size={16} />
        +12% this month
      </div>
    </div>
  );
};

export default StatCard;