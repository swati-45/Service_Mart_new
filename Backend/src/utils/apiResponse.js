// utils/apiResponse.js
// These are helper functions to send consistent
// responses from every API endpoint

// Send a success response
// Usage: sendSuccess(res, 200, 'Done', { user })
const sendSuccess = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  })
}

// Send an error response
// Usage: sendError(res, 400, 'Something went wrong')
const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message,
  })
}

module.exports = { sendSuccess, sendError }
