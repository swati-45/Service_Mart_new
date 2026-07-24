const asyncHandler = require("express-async-handler");
const Razorpay = require("../config/razorpay");
const Booking = require("../models/booking.model");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const crypto = require("crypto");

const createOrder = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return sendError(res, 404, "Booking not found");
  }

  const options = {
    amount: booking.payment.amount * 100,
    currency: "INR",
    receipt: booking.bookingId,
  };

  const order = await Razorpay.orders.create(options);

  booking.payment.razorpayOrderId = order.id;
  await booking.save();

  sendSuccess(res, 200, "Order created", {
    order,
    key: process.env.RAZORPAY_KEY_ID,
  });
});


const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return sendError(res, 400, "Payment verification failed");
  }

  const booking = await Booking.findOne({
    "payment.razorpayOrderId": razorpay_order_id,
  });

  if (!booking) {
    return sendError(res, 404, "Booking not found");
  }

  booking.payment.status = "paid";
  booking.payment.razorpayPaymentId = razorpay_payment_id;
  booking.payment.razorpaySignature = razorpay_signature;

  booking.status = "confirmed";

  await booking.save();

  sendSuccess(res, 200, "Payment verified successfully", {
    booking,
  });
});

const retryPayment = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return sendError(res, 404, "Booking not found");
  }

  if (booking.payment.status === "paid") {
    return sendError(res, 400, "Booking already paid");
  }

  const options = {
    amount: booking.payment.amount * 100,
    currency: "INR",
    receipt: booking.bookingId,
  };

  const order = await Razorpay.orders.create(options);

  booking.payment.razorpayOrderId = order.id;
  await booking.save();

  sendSuccess(res, 200, "Retry order created", {
    order,
    key: process.env.RAZORPAY_KEY_ID,
  });
});

module.exports = {
  createOrder,
  verifyPayment,
  retryPayment,
};