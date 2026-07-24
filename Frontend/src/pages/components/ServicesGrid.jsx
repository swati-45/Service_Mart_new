import React from "react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../../components/ServiceCard";
import { SERVICES } from "../../utils/constants";

const ServicesGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_35%),radial-gradient(circle_at_bottom_left,#ede9fe,transparent_35%)] opacity-70"></div>

  <div className="relative max-w-7xl mx-auto px-6">
     
        
      <div className="text-center mb-16">

  <span className="inline-flex items-center rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
    OUR SERVICES
  </span>

  <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">
    Professional Services
    <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      For Every Home
    </span>
  </h2>

  <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-500">
    Book trusted professionals for plumbing, electrical work,
    cleaning, appliance repair, painting and many more services—
    all with transparent pricing and verified experts.
  </p>

</div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => navigate(`/services`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
