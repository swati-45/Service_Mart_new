// middlewares/errorMiddleware.js
// This catches ALL errors in the app
// Instead of crashing, it sends a proper error response

const errorHandler = (err, req, res, next) => {
  // Sometimes error comes without a status code
  // Default to 500 (Internal Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  // MongoDB: ID format is wrong (not a valid ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404
    message = 'Resource not found. Invalid ID format.'
  }

  // MongoDB: Duplicate value (like email already exists)
  if (err.code === 11000) {
    statusCode = 400
    const field = Object.keys(err.keyValue)[0]
    message = `${field} already exists. Please use a different one.`
  }

  // JWT: Token is invalid
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid token. Please login again.'
  }

  // JWT: Token has expired
  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Token expired. Please login again.'
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    // Only show full error details in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  })
}

module.exports = { errorHandler }
