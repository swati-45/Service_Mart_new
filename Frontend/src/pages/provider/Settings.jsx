import React, { useState } from "react";
import api from "../../api/api";

const Settings = () => {
  // const [notifications, setNotifications] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordUpdate = async () => {
    try {
      await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      alert("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your account preferences.
        </p>
      </div>

      {/* Change Password */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Change Password
        </h2>

        <div className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={handlePasswordUpdate}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Notifications */}

 {/* Notifications */}

<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
  <h2 className="text-xl font-bold text-slate-900">
    Email Notifications
  </h2>

  <p className="mt-2 text-slate-500">
    Email notifications for booking updates will be available in a future update.
  </p>

  <span className="mt-5 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
    Coming Soon
  </span>
</div>
    </div>
  );
};

export default Settings;