import React, { useRef,useEffect,useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MapPin,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

const [profileOpen, setProfileOpen] = useState(false);

const profileRef = useRef(null);

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  if (hideNavbar) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

//  useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (
//       profileRef.current &&
//       !profileRef.current.contains(event.target)
//     ) {
//       setProfileOpen(false);
//     }
//   };

//   document.addEventListener("mousedown", handleClickOutside);

//   return () =>
//     document.removeEventListener(
//       "mousedown",
//       handleClickOutside
//     );
// }, []);


  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    ...(isAuthenticated
      ? [{ label: "Bookings", path: "/dashboard" }]
      : []),
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 via-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/30">
            <span className="text-lg font-black">S</span>
          </div>

          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">
              ServiceMart
            </h2>

            <p className="-mt-1 text-[11px] uppercase tracking-[0.25em] text-slate-500">
              Home Services
            </p>
          </div>

        </Link>

        {/* Desktop */}

        <div className="hidden items-center gap-10 md:flex">

          {navLinks.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`relative font-semibold transition-all duration-300 ${
                location.pathname === item.path
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {item.label}

              {location.pathname === item.path && (
                <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-linear-to-r from-blue-600 to-violet-600"></span>
              )}
            </Link>

          ))}

        </div>

        {/* Right */}

        <div className="hidden items-center gap-5 md:flex">

          {/* <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 hover:shadow-md">

            <MapPin size={16} className="text-blue-600" />

            <span className="text-sm font-medium text-slate-700">
              Bangalore
            </span>

          </button> */}

          {isAuthenticated ? (
            <>

             <NotificationBell />


             <div className="relative" ref={profileRef}>

  <button
  type="button"
  onClick={() => setProfileOpen((prev) => !prev)}
  className="flex items-center gap-1"
>
  <User size={22} className="text-slate-700" />

  <ChevronDown
    size={16}
    className={`transition-transform ${
      profileOpen ? "rotate-180" : ""
    }`}
  />
</button>



  {profileOpen && (
    <div className="absolute right-0 top-full z-50 mt-3 w-56 rounded-2xl border border-slate-200 bg-white py-2 shadow-xl">

      <Link
        to="/dashboard"
        onClick={() => setProfileOpen(false)}
        className="block px-5 py-3 hover:bg-slate-100"
      >
        👤 User Dashboard
      </Link>

      <Link
        to="/provider/dashboard"
        onClick={() => setProfileOpen(false)}
        className="block px-5 py-3 hover:bg-slate-100"
      >
        🛠 Provider Dashboard
      </Link>

      <Link
        to="/profile"
        onClick={() => setProfileOpen(false)}
        className="block px-5 py-3 hover:bg-slate-100"
      >
        ⚙ My Profile
      </Link>

      <hr className="my-2" />

      <button
        onClick={() => {
          setProfileOpen(false);
          handleLogout();
        }}
        className="w-full px-5 py-3 text-left text-red-600 hover:bg-red-50"
      >
        🚪 Logout
      </button>
    </div>
  )}
</div>


            </>
          ) : (
            <div className="flex items-center gap-3">

              <Link
                to="/login"
                className="font-medium text-slate-600 hover:text-blue-600"
              >
                Login
              </Link>

              <button
                onClick={() => navigate("/signup")}
                className="rounded-full bg-linear-to-r from-blue-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                Sign Up
              </button>

            </div>
          )}

        </div>

        {/* Mobile */}

        <button
          className="rounded-xl p-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}

      {mobileOpen && (

        <div className="border-t bg-white md:hidden">

          <div className="space-y-2 p-5">

            {navLinks.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl p-3 font-medium hover:bg-slate-100"
              >
                {item.label}
              </Link>

            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block rounded-xl p-3 hover:bg-slate-100"
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-xl bg-red-50 p-3 text-left font-semibold text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block rounded-xl p-3 hover:bg-slate-100"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="block rounded-xl bg-linear-to-r from-blue-600 to-violet-600 p-3 text-center font-semibold text-white"
                >
                  Sign Up
                </Link>
              </>
            )}

          </div>

        </div>

      )}

    </nav>
  );
};

export default Navbar;