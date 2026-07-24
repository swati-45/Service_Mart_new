// models/User.js
// This defines what a User looks like in our database
// Think of it as a template/blueprint for user data

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Define the shape of user data
const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,           // removes extra spaces
    },

    // Email address (must be unique)
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,      // store as lowercase always
      trim: true,
    },

    // Indian mobile number
  mobile: {
  type: String,
  unique: true,
  sparse: true,
  match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"],
},

    // Password (will be hashed before saving)
   password: {
  type: String,
  minlength: [8, "Password must be at least 8 characters"],
  select: false,
},

    // User role
    role: {
      type: String,
      enum: ['user', 'provider', 'admin'], // only these 3 values allowed
      default: 'user',
    },

    // Profile photo URL
    avatar: {
      type: String,
      default: '',
    },

     googleId: {
  type: String,
  unique: true,
  sparse: true,
},

authProvider: {
  type: String,
  enum: ["local", "google"],
  default: "local",
},


    // Saved home addresses
    addresses: [
      {
        label: String,   // e.g. "Home", "Office"
        flat: String,
        area: String,
        city: String,
        pincode: String,
        isDefault: { type: Boolean, default: false },
      },
    ],

    // Wallet balance in rupees
    walletBalance: {
      type: Number,
      default: 0,
    },

    // Is this account active?
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
)

// ── HOOKS ────────────────────────────────────────────
// These run automatically before/after saving

// Before saving, hash the password if it was changed
userSchema.pre('save', async function (next) {
  // Only hash if password was actually changed
 if (!this.password || !this.isModified("password")) {
    return next();
}

  // Hash password with strength of 10
  // Higher number = more secure but slower
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// ── METHODS ──────────────────────────────────────────
// Custom functions we can call on a user object

// Check if entered password matches the stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Create the model from schema
const User = mongoose.model('User', userSchema)

module.exports = User
