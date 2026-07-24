const express = require("express");
const router = express.Router();

const {
  getAllProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
  getMyProfile,
  updateMyProfile,
  getMyServices,
  addService,
  updateService,
  deleteService,
  getDashboard,   // 👈 Add this
  getEarnings,
} = require("../controllers/provider.controller");

const { protect } = require("../middlewares/auth.middleware");

// =========================
// Public Routes
// =========================

// Get all approved providers
router.get("/", getAllProviders);
// Logged in provider
router.get("/me", protect, getMyProfile);
router.get("/dashboard", protect, getDashboard);

router.put("/me", protect, updateMyProfile);
router.get("/services", protect, getMyServices);
router.get("/earnings", protect, getEarnings);

router.post("/services", protect, addService);

router.put(
  "/services/:serviceId",
  protect,
  updateService
);

router.delete(
  "/services/:serviceId",
  protect,
  deleteService
);

// Get provider by ID
router.get("/:id", getProviderById);

// =========================
// Protected Routes
// =========================

router.post("/", protect, createProvider);
router.put("/:id", protect, updateProvider);
router.delete("/:id", protect, deleteProvider);

module.exports = router;