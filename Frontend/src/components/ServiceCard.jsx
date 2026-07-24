import React from "react";
import Card from "./Card";
import * as Icons from "lucide-react";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const ServiceCard = ({ service, onClick }) => {
  const IconComponent = Icons[service.icon] || Icons.Wrench;

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        hover
        padding="p-0"
        onClick={onClick}
        className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-2xl"
      >
        {/* Top Gradient */}
        <div className="relative overflow-hidden bg-linear-to-br from-blue-100 via-blue-300  via-blue-400 to-blue-700 p-8">

          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>

          <div className="flex justify-between items-start">

            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">

              <IconComponent
                size={42}
                className="text-white"
                strokeWidth={1.8}
              />

            </div>

            <div className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">

              <div className="flex items-center gap-1">

                <Star
                  size={14}
                  className="fill-yellow-300 text-yellow-300"
                />

                <span className="text-xs font-semibold text-white">
                  4.9
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="space-y-4 p-6">

          <div>

            <h3 className="text-xl font-bold text-slate-900 transition group-hover:text-blue-600">
              {service.name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {service.category}
            </p>

          </div>

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-wider text-slate-400">
                Starting From
              </p>

              <h4 className="mt-1 text-2xl font-black text-slate-900">
                ₹{service.startingPrice}
              </h4>

            </div>

            <button
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 group-hover:text-white"
            >
              <ArrowRight size={20} />
            </button>

          </div>

        </div>

      </Card>
    </motion.div>
  );
};

export default ServiceCard;