import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/provider/Sidebar";
import Topbar from "../components/provider/Topbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../socket";


const ProviderLayout = () => {
 const user = useSelector((state) => state.auth.user);
   useEffect(() => {
  if (!user?._id) return;

  if (!socket.connected) {
    socket.connect();
  }

  const handleConnect = () => {
    console.log("Socket Connected:", socket.id);

    socket.emit("join", user._id);

    console.log("Joined Room:", user._id);
  };

  socket.on("connect", handleConnect);

  if (socket.connected) {
    handleConnect();
  }

  const handleNewBooking = (data) => {
    console.log("NEW BOOKING:", data);

    alert(data.message);
  };

  socket.on("newBooking", handleNewBooking);

  return () => {
    socket.off("connect", handleConnect);
    socket.off("newBooking", handleNewBooking);
  };
}, [user]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-slate-200 bg-white lg:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <Topbar />
        </header>

        {/* Page */}
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProviderLayout;