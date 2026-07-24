const asyncHandler = require("express-async-handler");
const Provider = require("../models/provider.model");
const Booking = require("../models/booking.model");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const User = require("../models/user.model");

// ==============================
// GET /api/providers
// Get all approved providers
// ==============================
const getAllProviders = asyncHandler(async (req, res) => {
  const { trade, city, minRating } = req.query;

  const filter = {
    // isApproved: true,
    // isAvailable: true,
  };

  if (trade) filter.trade = trade;
  if (city) filter.city = { $regex: city, $options: "i" };
  if (minRating) filter.rating = { $gte: Number(minRating) };

  const providers = await Provider.find(filter)
    .populate("user", "name avatar email")
    .sort({ rating: -1 });

  sendSuccess(res, 200, "Providers fetched successfully", {
    providers,
  });
});

// ==============================
// GET /api/providers/:id
// Get single provider
// ==============================
const getProviderById = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id).populate(
    "user",
    "name avatar email mobile"
  );

  if (!provider) {
    return sendError(res, 404, "Provider not found");
  }

  sendSuccess(res, 200, "Provider fetched successfully", {
    provider,
  });
});
 
// ==============================
// GET /api/providers/me
// Logged in provider profile
// ==============================

const getMyProfile = asyncHandler(async (req, res) => {
  const provider = await Provider.findOne({
    user: req.user._id,
  }).populate("user", "name email mobile avatar");

  // Profile doesn't exist yet
  if (!provider) {
    return sendSuccess(res, 200, "Provider profile not created", {
      provider: null,
    });
  }

  sendSuccess(res, 200, "Profile fetched successfully", {
    provider,
  });
});


// ==============================
// PUT /api/providers/me
// Update logged in provider profile
// ==============================

const updateMyProfile = asyncHandler(async (req, res) => {
  let provider = await Provider.findOne({
    user: req.user._id,
  });

  // First time profile creation
  if (!provider) {
    provider = new Provider({
      user: req.user._id,
    });
  }

  // Provider fields
  provider.trade = req.body.trade;
  provider.bio = req.body.bio || "";
  provider.experience = Number(req.body.experience) || 0;
  provider.city = req.body.city;
  provider.state = req.body.state;
  provider.address = req.body.address || "";
  provider.pincode = req.body.pincode || "";
  provider.pricePerHour = Number(req.body.pricePerHour) || 0;
  provider.skills = req.body.skills || [];
  provider.profileImage = req.body.profileImage || "";
  provider.isAvailable =
    req.body.isAvailable ?? provider.isAvailable;

  await provider.save();

  // Update user info
  const user = await User.findById(req.user._id);

  if (user) {
    if (req.body.fullName !== undefined) {
      user.name = req.body.fullName;
    }

    if (req.body.phone !== undefined) {
      user.mobile = req.body.phone;
    }

    await user.save();
  }

  const updatedProvider = await Provider.findById(provider._id)
    .populate("user", "name email mobile avatar");

  sendSuccess(res, 200, "Profile updated successfully", {
    provider: updatedProvider,
  });
});




// ===========================================
// GET /api/providers/services
// ===========================================
const getMyServices = asyncHandler(async (req, res) => {
  const provider = await Provider.findOne({
    user: req.user._id,
  });

  if (!provider) {
    return sendError(res, 404, "Provider not found");
  }

  sendSuccess(res, 200, "Services fetched successfully", {
    services: provider.priceMenu,
  });
});

// ===========================================
// POST /api/providers/services
// ===========================================
const addService = asyncHandler(async (req, res) => {
  const { serviceName, description, price } = req.body;

  const provider = await Provider.findOne({
    user: req.user._id,
  });

  if (!provider) {
    return sendError(res, 404, "Provider not found");
  }

  provider.priceMenu.push({
    serviceName,
    description,
    price,
  });

  await provider.save();

  sendSuccess(res, 201, "Service added successfully", {
    services: provider.priceMenu,
  });
});

// ===========================================
// PUT /api/providers/services/:serviceId
// ===========================================
const updateService = asyncHandler(async (req, res) => {
  const provider = await Provider.findOne({
    user: req.user._id,
  });

  if (!provider) {
    return sendError(res, 404, "Provider not found");
  }

  const service = provider.priceMenu.id(req.params.serviceId);

  if (!service) {
    return sendError(res, 404, "Service not found");
  }

  service.serviceName =
    req.body.serviceName ?? service.serviceName;

  service.description =
    req.body.description ?? service.description;

  service.price =
    req.body.price ?? service.price;

  await provider.save();

  sendSuccess(res, 200, "Service updated successfully", {
    services: provider.priceMenu,
  });
});

// ===========================================
// DELETE /api/providers/services/:serviceId
// ===========================================
const deleteService = asyncHandler(async (req, res) => {
  const provider = await Provider.findOne({
    user: req.user._id,
  });

  if (!provider) {
    return sendError(res, 404, "Provider not found");
  }

  const service = provider.priceMenu.id(req.params.serviceId);

  if (!service) {
    return sendError(res, 404, "Service not found");
  }

  service.deleteOne();

  await provider.save();

  sendSuccess(res, 200, "Service deleted successfully", {
    services: provider.priceMenu,
  });
});





// get dashboard
const getDashboard = asyncHandler(async (req, res) => {
  const provider = await Provider.findOne({
    user: req.user._id,
  });

  if (!provider) {
    return sendSuccess(res, 200, "Dashboard fetched", {
      stats: {
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        totalEarnings: 0,
      },
      recentBookings: [],
    });
  }



console.log("Current Provider ID:", provider._id.toString());

const allBookings = await Booking.find();

console.log(
  "All Booking Provider IDs:",
  allBookings.map((b) => b.provider.id)
);

  const bookings = await Booking.find({
  "provider.id": provider._id.toString(),
})
.populate("user", "name")
.sort({ createdAt: -1 });

console.log("Matched bookings:", bookings.length);




const totalBookings = bookings.length


  const pendingBookings = bookings.filter(
    (b) => b.status === "pending"
  ).length;

  const completedBookings = bookings.filter(
    (b) => b.status === "completed"
  ).length;

  const totalEarnings = bookings

  .filter((b) => b.status === "completed")
.reduce((sum, b) => sum + (b.payment?.amount || 0), 0);

  sendSuccess(res, 200, "Dashboard fetched", {
    stats: {
      totalBookings,
      pendingBookings,
      completedBookings,
      totalEarnings,
    },
    recentBookings: bookings.slice(0, 5),
  });
});


// getearning
// ===========================================
// GET /api/providers/earnings
// ===========================================
const getEarnings = asyncHandler(async (req, res) => {
  const provider = await Provider.findOne({
    user: req.user._id,
  });

  if (!provider) {
    return sendSuccess(res, 200, "Earnings fetched", {
      totalEarnings: 0,
      thisMonth: 0,
      pendingPayout: 0,
      transactions: [],
    });
  }

  const bookings = await Booking.find({
    "provider.id": provider._id.toString(),
  })
    .populate("user", "name")
    .sort({ createdAt: -1 });
          
      const monthlyMap = {};

bookings.forEach((booking) => {
  if (booking.status !== "completed") return;

  const date = new Date(booking.createdAt);

  const month = date.toLocaleString("default", {
    month: "short",
  });

  if (!monthlyMap[month]) {
    monthlyMap[month] = 0;
  }

  monthlyMap[month] += booking.payment?.amount || 0;
});

const monthOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthlyRevenue = monthOrder.map((month) => ({
  month,
  revenue: monthlyMap[month] || 0,
}));

  const now = new Date();

  const totalEarnings = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + (b.payment?.amount || 0), 0);

  const thisMonth = bookings
    .filter(
      (b) =>
        b.status === "completed" &&
        new Date(b.createdAt).getMonth() === now.getMonth() &&
        new Date(b.createdAt).getFullYear() === now.getFullYear()
    )
    .reduce((sum, b) => sum + (b.payment?.amount || 0), 0);

  const pendingPayout = bookings
    .filter(
      (b) =>
        b.status === "confirmed" ||
        b.status === "in_progress"
    )
    .reduce((sum, b) => sum + (b.payment?.amount || 0), 0);

  const transactions = bookings
    .filter((b) => b.status === "completed")
    .map((b) => ({
      id: b._id,
      customer: b.user?.name || "Customer",
      service: b.serviceName,
      amount: b.payment?.amount || 0,
      date: b.createdAt,
      status: "Completed",
    }));

  sendSuccess(res, 200, "Earnings fetched", {
    totalEarnings,
    thisMonth,
    pendingPayout,
    transactions,
    monthlyRevenue,
  });
});


// ==============================
// POST /api/providers
// Create provider profile
// ==============================
const createProvider = asyncHandler(async (req, res) => {
  const exists = await Provider.findOne({
    user: req.user._id,
  });

  if (exists) {
    return sendError(res, 400, "Provider profile already exists");
  }

  const provider = await Provider.create({
    ...req.body,
    user: req.user._id,
  });

  sendSuccess(res, 201, "Provider profile created", {
    provider,
  });
});

// ==============================
// PUT /api/providers/:id
// Update provider profile
// ==============================
const updateProvider = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id);

  if (!provider) {
    return sendError(res, 404, "Provider not found");
  }

  Object.assign(provider, req.body);

  await provider.save();

  sendSuccess(res, 200, "Provider updated successfully", {
    provider,
  });
});

// ==============================
// DELETE /api/providers/:id
// Delete provider
// ==============================
const deleteProvider = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id);

  if (!provider) {
    return sendError(res, 404, "Provider not found");
  }

  await provider.deleteOne();

  sendSuccess(res, 200, "Provider deleted successfully");
});

module.exports = {
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
  getDashboard,
  getEarnings,
};