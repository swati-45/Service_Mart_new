import React from "react";
import { ShieldCheck, MapPin, Briefcase, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Card from "./Card";
import StarRating from "./StarRating";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const ProviderCard = ({ provider }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        hover
        className="flex h-full flex-col p-6"
      >
        {/* Header */}

        <div className="flex items-start gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-100 to-blue-50 text-xl font-bold text-blue-600">
            {provider.name.charAt(0)}
          </div>

          <div className="flex-1">

            <div className="flex items-center gap-2">

              <h3 className="truncate text-lg font-bold text-slate-900">
                {provider.name}
              </h3>

              {provider.isVerified && (
                <ShieldCheck
                  size={18}
                  className="text-green-500"
                />
              )}

            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <Briefcase size={15} />
              {provider.trade}
            </div>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={15} />
              {provider.city}
            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-5 h-px bg-slate-100"></div>

        {/* Rating */}

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-2">

              <span className="text-lg font-bold text-slate-900">
                {provider.rating}
              </span>

              <StarRating
                rating={provider.rating}
                size={15}
              />

            </div>

            <p className="mt-1 text-xs text-slate-500">
              {provider.reviews} Reviews
            </p>

          </div>

          <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            {provider.experience}+ Years
          </div>

        </div>

        {/* Footer */}

        <div className="mt-6">

          <Button
            variant="outline"
            className="group w-full rounded-2xl border-blue-600 py-3 text-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={() => navigate(`/providers/${provider.id}`)}
          >
            <span className="flex items-center justify-center gap-2">
              View Profile
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Button>

        </div>

      </Card>
    </motion.div>
  );
};

export default ProviderCard;