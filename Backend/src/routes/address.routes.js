const express = require("express");
const router = express.Router();

const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/address.controller");

const { protect } = require("../middlewares/auth.middleware");

router
  .route("/")
  .post(protect, addAddress)
  .get(protect, getAddresses);

router
  .route("/:id")
  .put(protect, updateAddress)
  .delete(protect, deleteAddress);

router.patch("/:id/default", protect, setDefaultAddress);

module.exports = router;