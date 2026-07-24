// middlewares/authMiddleware.js
// This checks if the user is logged in
// It runs BEFORE the actual route handler

const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const protect = async (req, res, next) => {
  let token

  // Check if token exists in request headers
  // Frontend sends: Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get only the token part (remove "Bearer ")
      token = req.headers.authorization.split(' ')[1]

      // Verify the token is real and not expired
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Find the user from database using ID in token
      // .select('-password') means don't include password
      req.user = await User.findById(decoded.id).select('-password')

      // Move to the next function (actual route)
      next()

    } catch (error) {
      console.log('Token verification failed:', error.message)
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Token failed.'
      })
    }
  }

  // If no token found at all
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. No token provided.'
    })
  }
}

module.exports = { protect }
