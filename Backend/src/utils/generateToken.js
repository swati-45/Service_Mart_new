// utils/generateToken.js
// This creates a JWT token for a logged in user
// Token is like a "pass" that proves who you are

const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
  // Create token using user ID and secret key
  // Token expires in 7 days (from .env)
  const token = jwt.sign(
    { id: userId },             // what to store inside token
    process.env.JWT_SECRET,     // secret key to sign with
    { expiresIn: process.env.JWT_EXPIRE || '7d' } // when it expires
  )

  return token
}

module.exports = generateToken
