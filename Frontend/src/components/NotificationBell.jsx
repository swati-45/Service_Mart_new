import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import {
  getNotifications,
  markAsRead,
} from "../api/notificationService";
import socket from "../socket";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleNewBooking = () => {
      loadNotifications();
    };

    socket.on("newBooking", handleNewBooking);

    return () => {
      socket.off("newBooking", handleNewBooking);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell size={24} />

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border z-50">
          <div className="p-4 border-b font-semibold">
            Notifications
          </div>

          {notifications.length === 0 ? (
            <p className="p-4 text-gray-500">
              No notifications
            </p>
          ) : (
            notifications.map((item) => (
              <div
                key={item._id}
                onClick={() => handleRead(item._id)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                  !item.isRead ? "bg-blue-50" : ""
                }`}
              >
                <h4 className="font-semibold">{item.title}</h4>

                <p className="text-sm text-gray-600">
                  {item.message}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;