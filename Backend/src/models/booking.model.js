// models/Booking.js
// A booking record when user books a provider

const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    // Who made the booking
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Which provider was booked
   provider: {
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  trade: {
    type: String,
    default: "",
  },
},

    // What service was booked
    serviceName: {
      type: String,
      required: true,
    },

    // Booking date (just the date, not time)
    bookingDate: {
      type: Date,
      required: true,
    },

    // Time slot e.g. "10:00 AM"
    timeSlot: {
      type: String,
      required: true,
    },

    // What problem the user described
    issueDescription: {
      type: String,
      default: '',
    },

    // Address where service will happen
   address: {
  fullName: String,
  mobile: String,
  houseNo: String,
  area: String,
  landmark: String,
  city: String,
  state: String,
  pincode: String,
},

    // Payment info
   payment: {
  method: {
    type: String,
    enum: ["UPI", "Card", "NetBanking", "Wallet", "Cash"],
    default: "Cash",
  },

  status: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  },

  amount: {
    type: Number,
    required: true,
  },

  razorpayOrderId: {
    type: String,
    default: "",
  },

  razorpayPaymentId: {
    type: String,
    default: "",
  },

  razorpaySignature: {
    type: String,
    default: "",
  },
},

    // Current status of booking
    status: {
      type: String,
      enum: [
        'pending',
        'confirmed',    // booking accepted
        'in_progress',  // provider is working
        'completed',    // job done
        'cancelled',    // booking cancelled
      ],
      default: 'pending',
    },

    // Review after job is done
    review: {
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: Date,
    },

    // Unique booking ID shown to user
    bookingId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

// Before saving, generate a booking ID
// Format: HF-2024-XXXXX (random 5 digit number)
bookingSchema.pre('save', function (next) {
  if (!this.bookingId) {
    const year = new Date().getFullYear()
    const random = Math.floor(10000 + Math.random() * 90000)
    this.bookingId = `HF-${year}-${random}`
  }
  next()
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
