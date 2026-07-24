import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

/* ---------- Global Components ---------- */

import Nav from "./components/Navbar";
import Footer from "./components/Footer";
import useAuth from "./hooks/useAuth";

/* ---------- Provider Layout ---------- */

import ProviderLayout from "./layouts/ProviderLayout";

/* ---------- Provider Pages ---------- */

import Dashboard from "./pages/provider/ProviderDashboard";
import MyServices from "./pages/provider/MyServices";
import BookingRequests from "./pages/provider/BookingRequests";
import Earnings from "./pages/provider/Earnings";
import Profile from "./pages/provider/Profile";
import Settings from "./pages/provider/Settings";

/* ---------- Public Pages ---------- */

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ServicesPage from "./pages/ServicesPage";
import ProviderProfilePage from "./pages/ProviderProfilePage";

/* ---------- User Pages ---------- */

import BookingPage from "./pages/BookingPage";
import DashboardPage from "./pages/Dashboard";
import UserProfilePage from "./pages/UserProfilePage";

/* ---------- Admin ---------- */

import AdminDashboard from "./pages/AdminDashboard";

/* ---------- Misc ---------- */

import NotFoundPage from "./pages/NotFoundPage";

/* ========================================================= */
/* Protected Route */
/* ========================================================= */

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

/* ========================================================= */
/* Role Route */
/* ========================================================= */

const RoleRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/* ========================================================= */
/* Conditional Navbar */
/* ========================================================= */

const ConditionalNavbar = () => {
  const location = useLocation();

  if (location.pathname.startsWith("/provider")) {
    return null;
  }

  return <Nav />;
};

/* ========================================================= */
/* Conditional Footer */
/* ========================================================= */

const ConditionalFooter = () => {
  const location = useLocation();

  const shouldHide =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/book/") ||
    location.pathname.startsWith("/provider");

  if (shouldHide) {
    return null;
  }

  return <Footer />;
};
function AppContent() {
  return (
    <>
      <ConditionalNavbar />

      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/services" element={<ServicesPage />} />

        <Route path="/services/:id" element={<ServicesPage />} />

        

        <Route
          path="/providers/:id"
          element={<ProviderProfilePage />}
        />

        {/* ---------- USER ROUTES ---------- */}
        

        <Route
          path="/book/:providerId/*"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />

        {/* <Route path="/bookings/:id" element={<BookingDetailsPage />} /> */}

        {/* ---------- ADMIN ---------- */}

        <Route
          path="/admin/*"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleRoute>
          }
        />

        {/* ---------- PROVIDER ---------- */}

        <Route
          path="/provider/*"
          element={
            <ProtectedRoute>
              <ProviderLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="my-services" element={<MyServices />} />

          <Route
            path="bookings"
            element={<BookingRequests />}
          />
         
          <Route path="earnings" element={<Earnings />} />

          <Route path="profile" element={<Profile />} />

          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ---------- 404 ---------- */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ConditionalFooter />
    </>
  );
}

export default AppContent;