// controllers/bookingController.js
// Create and manage bookings
const Notification = require("../models/notification.model");
const asyncHandler = require('express-async-handler')
const Booking = require('../models/booking.model')
const { sendSuccess, sendError } = require('../utils/apiResponse')
const Provider = require("../models/provider.model");

// POST /api/bookings
// Create a new booking
const createBooking = asyncHandler(async (req, res) => {
  const {
  providerId,
  serviceName,
  bookingDate,
  timeSlot,
  issueDescription,
  address,
  payment,
} = req.body;

  // Basic validation
  if (!providerId || !serviceName || !bookingDate || !timeSlot) {
    return sendError(res, 400, 'Please fill in all required fields')
  }

  if (
  !address ||
  !address.fullName ||
  !address.mobile ||
  !address.houseNo ||
  !address.area ||
  !address.city ||
  !address.state ||
  !address.pincode
) {
  return sendError(res, 400, "Address is required");
}

if (
  !payment ||
  !payment.method ||
  payment.amount == null
) {
  return sendError(res, 400, "Payment details are required");
}

  // Create the booking
const provider = await Provider.findById(providerId).populate(
  "user",
  "name"
);

if (!provider) {
  return sendError(res, 404, "Provider not found");
}

const booking = await Booking.create({
  user: req.user._id,

  provider: {
    id: provider._id.toString(),
    name: provider.user.name,
    trade: provider.trade,
  },

  serviceName,
  bookingDate,
  timeSlot,
  issueDescription,
  address,
  payment,
});

  console.log('New booking created:', booking.bookingId)

 console.log("Provider User ID:", provider.user._id.toString());


const io = req.app.get("io");

console.log("Emitting notification...");



io.to(provider.user._id.toString()).emit("newBooking", {
  message: `New booking received for ${serviceName}`,
});


await Notification.create({
  receiver: provider.user._id,
  title: "New Booking",
  message: `New booking received for ${serviceName}`,
  type: "booking",
  booking: booking._id,
});

const room = provider.user._id.toString();

console.log(io.sockets.adapter.rooms.get(room));



  sendSuccess(res, 201, 'Booking confirmed!', { booking })
})

// GET /api/bookings/my
// Get all bookings for logged in user
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    // .populate('provider', 'trade pricePerHour')
    .sort({ createdAt: -1 })  // newest first

  sendSuccess(res, 200, 'Bookings fetched', { bookings })
})





// GET /api/bookings/:id
// Get one booking by 


const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    // .populate('user', 'name mobile')
    // .populate('provider', 'trade city pricePerHour')

  if (!booking) {
    return sendError(res, 404, 'Booking not found')
  }

  // Make sure user can only see their own booking
  if (booking.user._id.toString() !== req.user._id.toString() 
      && req.user.role !== 'admin') {
    return sendError(res, 403, 'Not authorized to view this booking')
  }

  sendSuccess(res, 200, 'Booking fetched', { booking })
})

// PATCH /api/bookings/:id/cancel
// Cancel a booking
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)

  if (!booking) {
    return sendError(res, 404, 'Booking not found')
  }

  if (booking.status === "cancelled") {
  return sendError(res, 400, "Booking is already cancelled");
}

  // Only the user who made the booking can cancel it
  if (booking.user.toString() !== req.user._id.toString()) {
    return sendError(res, 403, 'Not authorized to cancel this booking')
  }

  if (booking.status === "in_progress") {
  return sendError(
    res,
    400,
    "Cannot cancel a booking that is already in progress"
  );
}

  // Can't cancel if already completed
  if (booking.status === 'completed') {
    return sendError(res, 400, 'Cannot cancel a completed booking')
  }

  booking.status = 'cancelled'
  await booking.save()

  sendSuccess(res, 200, 'Booking cancelled', { booking })
})

// =======================================
// GET /api/bookings/provider
// =======================================
const getProviderBookings = asyncHandler(async (req, res) => {

    const provider = await Provider.findOne({
        user: req.user._id,
    });

    if (!provider) {
        return sendError(res,404,"Provider not found");
    }

    const bookings = await Booking.find({
        "provider.id": provider._id.toString(),
    }).sort({
        createdAt:-1,
    });

    sendSuccess(res,200,"Bookings fetched successfully",{
        bookings,
    });

});


// =======================================
// PATCH /api/bookings/:id/status
// =======================================
const updateBookingStatus = asyncHandler(async (req,res)=>{

    const provider = await Provider.findOne({
        user:req.user._id,
    });

    if(!provider){
        return sendError(res,404,"Provider not found");
    }


    const booking = await Booking.findById(req.params.id);

    if(!booking){
        return sendError(res,404,"Booking not found");
    }

    if(booking.provider.id!==provider._id.toString()){
        return sendError(res,403,"Unauthorized");
    }

    booking.status=req.body.status;

    await booking.save();

    sendSuccess(res,200,"Booking updated",{
        booking,
    });

});

module.exports={
createBooking,
getMyBookings,
getBookingById,
cancelBooking,

getProviderBookings,
updateBookingStatus,
}