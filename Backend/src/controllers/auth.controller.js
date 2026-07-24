// controllers/authController.js
// Handles login and signup logic


const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const generateToken = require('../utils/generateToken')
const { sendSuccess, sendError } = require('../utils/apiResponse')
const Provider = require("../models/provider.model");

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// ── SIGNUP ───────────────────────────────────────────
// POST /api/auth/signup
const signup = asyncHandler(async (req, res) => {
  console.log('Signup attempt:', req.body.email)

  const { name, email, mobile, password } = req.body

  // Check all fields are provided
  if (!name || !email || !mobile || !password) {
    return sendError(res, 400, 'Please fill in all fields')
  }

  // Check if email already registered
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    return sendError(res, 400, 'Email already registered')
  }

  // Check if mobile already registered
  const mobileExists = await User.findOne({ mobile })
  if (mobileExists) {
    return sendError(res, 400, 'Mobile number already registered')
  }

  // Create new user in database
  // Password gets hashed automatically (see User model)
  const user = await User.create({ name, email, mobile, password })

  console.log('New user created:', user._id)

  // Send back user data + token
  sendSuccess(res, 201, 'Account created successfully!', {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
    token: generateToken(user._id),
  })
})

// ── LOGIN ────────────────────────────────────────────
// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  console.log('Login attempt:', req.body.email)

  const { identifier, password } = req.body;

if (!identifier || !password) {
  return sendError(res, 400, 'Please enter email/mobile and password');
}

const user = await User.findOne({
  $or: [
    { email: identifier },
    { mobile: identifier }
  ]
}).select('+password');

  // Check user exists AND password matches
  if (!user || !(await user.matchPassword(password))) {
    return sendError(res, 401, 'Invalid email or password')
  }

  // Check account is active
  if (!user.isActive) {
    return sendError(res, 403, 'Your account has been deactivated')
  }

  console.log('Login successful:', user._id)

  sendSuccess(res, 200, 'Login successful!', {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
     avatar: user.avatar,
    role: user.role,
    token: generateToken(user._id),
  })
})

// ── GET CURRENT USER ─────────────────────────────────
// GET /api/auth/me (protected route)
const getMe = asyncHandler(async (req, res) => {
  // req.user is set by authMiddleware
  const user = await User.findById(req.user._id)

  sendSuccess(res, 200, 'User fetched', {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
    avatar: user.avatar,
    walletBalance: user.walletBalance,
    addresses: user.addresses,
  })
})

const googleLogin = asyncHandler(async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return sendError(res, 400, "Google credential is required");
  }

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const {
    sub,
    email,
    name,
    picture,
    email_verified,
  } = payload;

  if (!email_verified) {
    return sendError(res, 400, "Google email is not verified");
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      avatar: picture,
      googleId: sub,
      authProvider: "google",
    });
  } else {
    if (!user.googleId) {
      user.googleId = sub;
    }

    user.avatar = picture;
    user.authProvider = "google";

    await user.save();
  }

  sendSuccess(res, 200, "Google login successful", {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    avatar: user.avatar,
    role: user.role,
    token: generateToken(user._id),
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return sendError(res, 400, "Current password and new password are required");
  }

  if (newPassword.length < 8) {
  return sendError(res, 400, "Password must be at least 8 characters");
}

if (currentPassword === newPassword) {
  return sendError(
    res,
    400,
    "New password must be different from current password"
  );
}


  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return sendError(res, 404, "User not found");
  }

  const isMatch = await user.matchPassword(currentPassword);

  if (!isMatch) {
    return sendError(res, 400, "Current password is incorrect");
  }

  user.password = newPassword;

  // pre("save") hook automatically hashes the password
  await user.save();

  sendSuccess(res, 200, "Password updated successfully");
});


module.exports = {
  signup,
  login,
  googleLogin,
  getMe,
  changePassword,
};
