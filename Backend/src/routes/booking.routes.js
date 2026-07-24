// routes/bookingRoutes.js
const express = require('express')
const router = express.Router()

const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getProviderBookings,
updateBookingStatus,
} = require('../controllers/booking.controller')

const { protect } = require('../middlewares/auth.middleware')

// All booking routes need user to be logged in
// protect runs before every route handler below

// POST /api/bookings
router.post('/', protect, createBooking)

// GET /api/bookings/my
router.get('/', protect, getMyBookings)

router.get('/my', protect, getMyBookings)
router.get(
"/provider",
protect,
getProviderBookings
);

router.patch(
"/:id/status",
protect,
updateBookingStatus
);

// GET /api/bookings/:id
router.get('/:id', protect, getBookingById)

// PATCH /api/bookings/:id/cancel
router.patch('/:id/cancel', protect, cancelBooking)

module.exports = router
