// middlewares/roleMiddleware.js
// This checks if the logged in user has the right role
// Example: only admin can access admin routes

// Usage: router.get('/admin', protect, isAdmin, handler)
const isAdmin = (req, res, next) => {
  // req.user is set by authMiddleware
  if (req.user && req.user.role === 'admin') {
    next() // user is admin, continue
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admins only.'
    })
  }
}

// Check if user is a service provider
const isProvider = (req, res, next) => {
  if (req.user && 
     (req.user.role === 'provider' || req.user.role === 'admin')) {
    next()
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Providers only.'
    })
  }
}

module.exports = { isAdmin, isProvider }
