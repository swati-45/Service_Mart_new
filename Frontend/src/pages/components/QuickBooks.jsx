import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import { SERVICES } from "../../utils/constants";
import * as Icons from "lucide-react";

const QuickBook = () => {
  const navigate = useNavigate();
  const topServices = SERVICES.slice(0, 4);

  return (
    <Card padding="p-6">
      <h2 className="text-xl font-bold mb-4">Quick Book</h2>
      <div className="grid grid-cols-2 gap-4">
        {topServices.map((service) => {
          const Icon = Icons[service.icon];
          return (
            <button
              key={service.id}
              onClick={() => navigate("/services")}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-primary transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary mb-2 shadow-sm group-hover:scale-110 transition-transform">
                {Icon && <Icon size={20} />}
              </div>
              <span className="text-xs font-semibold text-center">
                {service.name}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickBook;
