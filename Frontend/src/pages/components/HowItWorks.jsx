import React from "react";
import { Search, Calendar, UserCheck, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Choose a Service",
      description:
        "Select the service you need from our wide variety of options.",
      icon: Search,
    },
    {
      id: 2,
      title: "Pick a Time",
      description:
        "Choose a date and time slot that works best for your schedule.",
      icon: Calendar,
    },
    {
      id: 3,
      title: "Pro Arrives",
      description:
        "A verified professional arrives at your doorstep to do the job.",
      icon: UserCheck,
    },
    {
      id: 4,
      title: "Rate & Pay",
      description: "Pay securely after the work is done and leave a rating.",
      icon: Star,
    },
  ];

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Booking a service with ServiceMart is simple, fast, and secure.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/4 left-[10%] right-[10%] h-0.5 bg-gray-200 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-100 shadow-md flex items-center justify-center text-primary mb-6 relative z-10">
                    <Icon size={24} />
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                      {step.id}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
