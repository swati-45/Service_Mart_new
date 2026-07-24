const asyncHandler = require("express-async-handler");
const Notification = require("../models/notification.model");
const { sendSuccess, sendError } = require("../utils/apiResponse");

// GET /api/notifications
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    receiver: req.user._id,
  }).sort({ createdAt: -1 });

  sendSuccess(res, 200, "Notifications fetched", {
    notifications,
  });
});

// PATCH /api/notifications/:id/read
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return sendError(res, 404, "Notification not found");
  }

  if (notification.receiver.toString() !== req.user._id.toString()) {
    return sendError(res, 403, "Unauthorized");
  }

  notification.isRead = true;

  await notification.save();

  sendSuccess(res, 200, "Notification marked as read", {
    notification,
  });
});

module.exports = {
  getNotifications,
  markAsRead,
};