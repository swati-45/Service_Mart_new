import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ShieldCheck,
  Star,
  Users,
  BriefcaseBusiness,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/services?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-violet-50 pt-28 pb-24">

      {/* Background */}

      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-[120px]" />

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg,#000 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 shadow">

            <Sparkles
              size={16}
              className="text-blue-600"
            />

            <span className="text-sm font-semibold text-blue-700">
              India's #1 Home Service Platform
            </span>

          </div>

          <h1 className="mt-7 text-5xl font-black leading-tight text-slate-900 lg:text-7xl">

            Home Services

            <br />

            <span className="bg-linear-to-r from-blue-600 via-cyan-500 to-violet-600 bg-clip-text text-transparent">

              Made Effortless.

            </span>

          </h1>

          <p className="mt-7 max-w-xl text-lg leading-9 text-slate-600">

            Book verified electricians, plumbers, painters,
            AC technicians and trusted professionals within
            minutes with transparent pricing and guaranteed
            quality.

          </p>

          {/* Search */}

          <form
            onSubmit={handleSearch}
            className="mt-10 flex w-full max-w-2xl overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-2xl backdrop-blur-xl"
          >

            <div className="flex items-center px-5 text-slate-400">
              <Search size={24} />
            </div>

            <input
              type="text"
              placeholder="Search for AC Repair, Plumber, Electrician..."
              className="flex-1 bg-transparent px-2 py-5 text-lg outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="submit"
              className="m-2 flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105"
            >
              Search
              <ArrowRight size={18} />
            </button>

          </form>

          {/* Stats */}

          <div className="mt-12 flex flex-wrap gap-8">

            <div>
              <h2 className="text-3xl font-black text-slate-900">10K+</h2>
              <p className="mt-1 text-slate-500">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900">500+</h2>
              <p className="mt-1 text-slate-500">Verified Professionals</p>
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900">4.9★</h2>
              <p className="mt-1 text-slate-500">Average Rating</p>
            </div>

          </div>

          {/* Trust Badges */}

          <div className="mt-12 flex flex-wrap gap-4">

            <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-md">
              <ShieldCheck className="text-green-500" size={20} />
              <span className="font-medium">Verified Experts</span>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-md">
              <Star className="fill-yellow-400 text-yellow-500" size={20} />
              <span className="font-medium">Premium Quality</span>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-md">
              <Users className="text-blue-500" size={20} />
              <span className="font-medium">Trusted by Thousands</span>
            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative hidden lg:flex items-center justify-center"
        >

                    <div className="relative">

            {/* Background Glow */}

            <div className="absolute -inset-8 rounded-full bg-blue-500/20 blur-3xl"></div>

            {/* Glass Card */}

            <div className="relative rounded-[36px] border border-white/60 bg-white/70 p-8 shadow-[0_30px_80px_rgba(59,130,246,0.18)] backdrop-blur-2xl">

              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80&auto=format&fit=crop"
                alt="Home Services"
                className="h-[480px] w-[430px] rounded-3xl object-cover"
              />

              {/* Top Floating Card */}

              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute -left-10 top-8"
              >
                <div className="rounded-2xl bg-white p-5 shadow-2xl">

                  <div className="flex items-center gap-3">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">

                      <BriefcaseBusiness
                        size={28}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <h3 className="font-bold text-slate-900">
                        500+ Experts
                      </h3>

                      <p className="text-sm text-slate-500">
                        Available Today
                      </p>

                    </div>

                  </div>

                </div>
              </motion.div>

              {/* Bottom Right Card */}

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="absolute -right-10 bottom-10"
              >
                <div className="rounded-2xl bg-white p-5 shadow-2xl">

                  <div className="flex items-center gap-4">

                    <div className="rounded-full bg-yellow-100 p-3">

                      <Star
                        size={24}
                        className="fill-yellow-400 text-yellow-500"
                      />

                    </div>

                    <div>

                      <h3 className="text-lg font-bold">
                        4.9 Rating
                      </h3>

                      <p className="text-sm text-slate-500">
                        Based on 12,000 Reviews
                      </p>

                    </div>

                  </div>

                </div>
              </motion.div>

              {/* Booking Card */}

              <motion.div
                animate={{
                  x: [0, 8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
                className="absolute left-10 bottom-20"
              >
                <div className="rounded-2xl bg-linear-to-r from-blue-600 to-violet-600 p-5 text-white shadow-2xl">

                  <p className="text-sm opacity-80">
                    Today's Booking
                  </p>

                  <h2 className="mt-1 text-3xl font-black">
                    248
                  </h2>

                  <p className="mt-2 text-sm opacity-90">
                    +18% from yesterday
                  </p>

                </div>
              </motion.div>

            </div>

          </div>

                  </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;