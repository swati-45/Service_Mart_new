const User = require('../models/user.model')
const { sendSuccess, sendError } = require('../utils/apiResponse')
const asyncHandler = require('express-async-handler')
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  sendSuccess(res, 200, 'Profile fetched', { user })
})



// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    return sendError(res, 404, 'User not found')
  }

  // Update only provided fields
  user.name = req.body.name || user.name
  user.mobile = req.body.mobile || user.mobile
  if (req.body.password) {
    user.password = req.body.password
  }

  const updatedUser = await user.save()
  sendSuccess(res, 200, 'Profile updated', { user: updatedUser })
})


const uploadProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return sendError(res, 400, "Please upload an image");
  }

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "homefix/profile",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });

  const user = await User.findById(req.user._id);

  user.avatar = result.secure_url;

  await user.save();

  sendSuccess(res, 200, "Profile image uploaded", {
    avatar: result.secure_url,
    user,
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  sendSuccess(res, 200, 'Users fetched', { users })
})

module.exports = {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
  getUsers,
};