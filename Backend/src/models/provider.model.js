const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    // Linked User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic Info
    trade: {
      type: String,
      required: true,
      enum: [
        "Electrician",
        "Plumber",
        "AC Technician",
        "Painter",
        "Carpenter",
        "Cleaner",
        "Appliance Repair",
        "Bathroom Fitter",
      ],
    },

    profileImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    skills: [
      {
        type: String,
      },
    ],

    // Location
    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    pincode: {
      type: String,
      default: "",
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    serviceRadius: {
      type: Number,
      default: 10,
    },

    // Pricing
    pricePerHour: {
      type: Number,
      required: true,
    },

    priceMenu: [
      {
        serviceName: String,
        description: String,
        price: Number,
      },
    ],

    // Ratings
    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    totalJobs: {
      type: Number,
      default: 0,
    },

    onTimePercent: {
      type: Number,
      default: 100,
    },

    // Availability
    isAvailable: {
      type: Boolean,
      default: true,
    },

    availability: {
      monday: { type: Boolean, default: true },
      tuesday: { type: Boolean, default: true },
      wednesday: { type: Boolean, default: true },
      thursday: { type: Boolean, default: true },
      friday: { type: Boolean, default: true },
      saturday: { type: Boolean, default: true },
      sunday: { type: Boolean, default: false },
    },

    // Images
    gallery: [
      {
        type: String,
      },
    ],

    // Verification
    verification: {
      aadhaar: {
        type: Boolean,
        default: false,
      },
      skillTest: {
        type: Boolean,
        default: false,
      },
      backgroundCheck: {
        type: Boolean,
        default: false,
      },
      homefixCertified: {
        type: Boolean,
        default: false,
      },
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Search Optimization
providerSchema.index({
  trade: 1,
  city: 1,
});

module.exports = mongoose.model("Provider", providerSchema);