import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "Become a Provider", path: "/join-as-pro" },
  ];

  const serviceLinks = [
    "Electrician",
    "Plumber",
    "AC Repair",
    "Cleaning",
    "Painting",
    "Salon at Home",
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/swati-gangwar-2599ab310/" },
    { icon: FaGithub, href: "https://github.com/swati-45"},
    { icon: FaTwitter, href: "#" },
    { icon: FaYoutube, href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-blue-100 opacity-60 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet-100 opacity-60 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-lg font-black text-white shadow-lg">
                S
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900">
                  ServiceMart
                </h2>
                <p className="-mt-1 text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  HOME SERVICES
                </p>
              </div>
            </Link>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              India's trusted marketplace for home services. Connect with
              verified professionals for every household need.
            </p>

            <div className="mt-4 inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
              ⭐ Trusted by 25,000+ Customers
            </div>

            <div className="mt-5 flex gap-2">
              {socialLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:text-white hover:shadow-md"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-base font-bold text-slate-900">
              Company
            </h3>

            <div className="space-y-3">
              {companyLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group flex items-center justify-between text-sm text-slate-500 transition hover:text-blue-600"
                >
                  {item.name}

                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-base font-bold text-slate-900">
              Popular Services
            </h3>

            <div className="space-y-3">
              {serviceLinks.map((service) => (
                <Link
                  key={service}
                  to="/services"
                  className="block text-sm text-slate-500 transition hover:text-blue-600"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-base font-bold text-slate-900">
              Contact Us
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <MapPin size={16} className="text-blue-600" />
                </div>

                <p className="text-sm leading-6 text-slate-500">
                   IIT BHU, Varanasi
                  <br />
                  U.P.
                  India - 221005
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <Phone size={16} className="text-blue-600" />
                </div>

                <span className="text-sm text-slate-500">
                  +91 7800427XXX
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <Mail size={16} className="text-blue-600" />
                </div>

                <span className="text-sm text-slate-500">
                  support@servicemart.in
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 py-5 md:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} ServiceMart. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-xs">
            <Link
              to="/privacy"
              className="text-slate-500 transition hover:text-blue-600"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-slate-500 transition hover:text-blue-600"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;