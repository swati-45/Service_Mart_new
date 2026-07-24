const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");


const {
  createOrder,
  verifyPayment,
  retryPayment,
} = require("../controllers/payment.controller");

router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);
router.post("/retry", protect, retryPayment);

module.exports = router;