import { motion } from "framer-motion";
import { Wrench, Zap, Paintbrush, Wind } from "lucide-react";

const services = [
  {
    title: "Electrician",
    price: "₹299",
    rating: "4.9",
    icon: Zap,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Plumber",
    price: "₹249",
    rating: "4.8",
    icon: Wrench,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Painting",
    price: "₹499",
    rating: "4.9",
    icon: Paintbrush,
    color: "from-pink-500 to-purple-500",
  },
  {
    title: "AC Service",
    price: "₹599",
    rating: "5.0",
    icon: Wind,
    color: "from-green-500 to-emerald-500",
  },
];

export default function HeroVisual() {
  return (
    <div className="relative h-[520px] flex items-center justify-center">
      {services.map((service, index) => {
        const Icon = service.icon;

        return (
          <motion.div
            key={service.title}
            animate={{
              y: [0, -18, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.08,
              rotate: 2,
            }}
            className={`absolute
            ${
              index === 0
                ? "-top-2 left-0"
                : index === 1
                ? "top-24 right-0"
                : index === 2
                ? "bottom-0 left-12"
                : "bottom-16 right-10"
            }`}
          >
            <div className="w-56 rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 cursor-pointer transition-all">
              <div
                className={`w-14 h-14 rounded-2xl bg-linear-to-r ${service.color} flex items-center justify-center text-white mb-5`}
              >
                <Icon size={28} />
              </div>

              <h3 className="font-bold text-xl">{service.title}</h3>

              <p className="text-slate-500 mt-1">
                Starting from {service.price}
              </p>

              <div className="mt-5 flex justify-between items-center">
                <span className="text-yellow-500 font-semibold">
                  ⭐ {service.rating}
                </span>

                <button className="rounded-full bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700 transition">
                  Book
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}

      <div className="absolute w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="absolute w-64 h-64 bg-violet-500/20 blur-[120px] rounded-full right-0 bottom-0" />
    </div>
  );
}