import React from "react";
import { Gift } from "lucide-react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const PromoBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[32px] p-8 md:p-12 text-white shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                <Gift size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Get ₹200 off your first booking
                </h3>
                <p className="text-blue-100 mb-0">
                  Use promo code{" "}
                  <span className="font-mono bg-white/20 px-2 py-1 rounded font-bold tracking-wider">
                    SERVICEMART200
                  </span>{" "}
                  at checkout.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="bg-white text-blue-600 hover:bg-blue-50 border-none shrink-0"
              onClick={() => navigate("/services")}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
