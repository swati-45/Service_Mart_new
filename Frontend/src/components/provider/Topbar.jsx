import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/authSlice";
import NotificationBell from "../NotificationBell";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const pageTitles = {
    "/provider/dashboard": "Dashboard",
    "/provider/my-services": "My Services",
    "/provider/bookings": "Booking Requests",
    "/provider/earnings": "Earnings",
    "/provider/profile": "Provider Profile",
     "/provider/settings": "Settings",
  };

  const pageTitle =
    pageTitles[location.pathname] || "Provider Panel";

    return (
    <div className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {pageTitle}
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-5">

      <div className="flex items-center gap-4">
  <NotificationBell />

  {/* Existing profile/avatar button */}
</div>

        <div className="relative" ref={profileRef}>

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white shadow-lg">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "P"}
            </div>

            <ChevronDown
              size={18}
              className={`transition ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-xl">

              <Link
                to="/provider/profile"
                onClick={() => setProfileOpen(false)}
                className="block px-5 py-3 transition hover:bg-slate-100"
              >
                👤 My Profile
              </Link>

              <Link
                to="/provider/settings"
                onClick={() => setProfileOpen(false)}
                className="block px-5 py-3 transition hover:bg-slate-100"
              >
                ⚙ Settings
              </Link>

              <hr className="my-2" />

              <button
                onClick={() => {
                  setProfileOpen(false);
                  handleLogout();
                }}
                className="block w-full px-5 py-3 text-left text-red-600 transition hover:bg-red-50"
              >
                🚪 Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Topbar;