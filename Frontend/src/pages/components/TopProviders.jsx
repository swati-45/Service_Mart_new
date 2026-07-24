import React from "react";
import ProviderCard from "../../components/ProviderCard";
import { PROVIDERS } from "../../utils/constants";

const TopProviders = () => {
  const topProviders = [...PROVIDERS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_35%),radial-gradient(circle_at_bottom_right,#ede9fe,transparent_35%)] opacity-70"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mb-16 text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            VERIFIED PROFESSIONALS
          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">
            Meet Our
            <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Top Rated Experts
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-500">
            Every professional is background verified, highly rated and
            experienced so you receive quality service every single time.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {topProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProviders;