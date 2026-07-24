const asyncHandler = require("express-async-handler");
const Address = require("../models/address.model");
const { sendSuccess, sendError } = require("../utils/apiResponse");

// ==============================
// Add Address
// POST /api/addresses
// ==============================
const addAddress = asyncHandler(async (req, res) => {
  const {
    fullName,
    mobile,
    houseNo,
    area,
    landmark,
    city,
    state,
    pincode,
    isDefault,
  } = req.body;

  if (
    !fullName ||
    !mobile ||
    !houseNo ||
    !area ||
    !city ||
    !state ||
    !pincode
  ) {
    return sendError(res, 400, "Please fill all required fields");
  }

  if (isDefault) {
    await Address.updateMany(
      { user: req.user._id },
      { isDefault: false }
    );
  }

  const address = await Address.create({
    user: req.user._id,
    fullName,
    mobile,
    houseNo,
    area,
    landmark,
    city,
    state,
    pincode,
    isDefault,
  });

  sendSuccess(res, 201, "Address added successfully", address);
});

// ==============================
// Get All Addresses
// GET /api/addresses
// ==============================
const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find({
    user: req.user._id,
  }).sort({
    isDefault: -1,
    createdAt: -1,
  });

  sendSuccess(res, 200, "Addresses fetched", addresses);
});

// ==============================
// Update Address
// PUT /api/addresses/:id
// ==============================
const updateAddress = asyncHandler(async (req, res) => {
  const address = await Address.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!address) {
    return sendError(res, 404, "Address not found");
  }

  if (req.body.isDefault) {
    await Address.updateMany(
      { user: req.user._id },
      { isDefault: false }
    );
  }

  Object.assign(address, req.body);

  await address.save();

  sendSuccess(res, 200, "Address updated", address);
});

// ==============================
// Delete Address
// DELETE /api/addresses/:id
// ==============================
const deleteAddress = asyncHandler(async (req, res) => {
  const address = await Address.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!address) {
    return sendError(res, 404, "Address not found");
  }

  sendSuccess(res, 200, "Address deleted");
});

// ==============================
// Set Default Address
// PATCH /api/addresses/:id/default
// ==============================
const setDefaultAddress = asyncHandler(async (req, res) => {
  const address = await Address.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!address) {
    return sendError(res, 404, "Address not found");
  }

  await Address.updateMany(
    { user: req.user._id },
    { isDefault: false }
  );

  address.isDefault = true;
  await address.save();

  sendSuccess(res, 200, "Default address updated", address);
});

module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};