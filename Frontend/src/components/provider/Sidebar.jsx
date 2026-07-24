import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  CalendarClock,
  Wallet,
  User,
   Settings,
  LogOut,
  Wrench,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slice/authSlice";
import { getLocal, removeLocal } from "../../utils/storage";


const menuItems = [
  {
    title: "Dashboard",
    path: "/provider/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Services",
    path: "/provider/my-services",
    icon: Briefcase,
  },
  {
    title: "Booking Requests",
    path: "/provider/bookings",
    icon: CalendarClock,
  },
  {
    title: "Earnings",
    path: "/provider/earnings",
    icon: Wallet,
  },
  {
    title: "Profile",
    path: "/provider/profile",
    icon: User,
  },
  {
    title: "Settings",
    path: "/provider/settings",
    icon: Settings,
  },
];


const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = getLocal("homefix_user");
  
  const displayName =
  user?.name ||
  user?.user?.name ||
  "Provider";

const initial = displayName.charAt(0).toUpperCase();


const handleLogout = () => {
  removeLocal("homefix_user");
  removeLocal("homefix_token");

  dispatch(
    setCredentials({
      user: null,
      token: null,
    })
  );

  navigate("/login", { replace: true });
};


  return (
    <div className="flex h-screen flex-col justify-between bg-white">
      {/* Top */}
      <div>
        {/* Logo */}

         
        <div  onClick={() => navigate("/")} className="flex items-center gap-3 border-b border-slate-200 px-7 py-7">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600">
            <Wrench className="text-white" size={28} />
          </div>

          <div>
            
            <h2 className="text-xl font-bold text-slate-900">
              
              ServiceMart
            </h2>

            <p className="text-sm text-slate-500">
              Provider Panel
            </p>
          </div>
        </div>

        {/* Menu */}

        <div className="mt-6 space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-4 rounded-2xl px-4 py-3 font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                <Icon size={22} />

                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom */}

    <div className="border-t border-slate-200 p-5">
  <div className="mb-5 flex items-center gap-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
      {initial}
    </div>

    <div>
      <h3 className="font-semibold text-slate-900">
        {displayName}
      </h3>

      <p className="text-sm text-slate-500">
        Verified Provider
      </p>
    </div>
  </div>


        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3 font-medium text-slate-600 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;