// routes/authRoutes.js
// URL paths for authentication

const express = require('express')
const router = express.Router()

const {
  signup,
  login,
  googleLogin,
  getMe,
  changePassword,
} = require("../controllers/auth.controller");

const { protect } = require('../middlewares/auth.middleware')

// POST /api/auth/signup
router.post('/signup', signup)

// POST /api/auth/login
router.post('/login', login)
router.post("/google", googleLogin);
router.put("/change-password", protect, changePassword);

// GET /api/auth/me (must be logged in)
router.get('/me', protect, getMe)

module.exports = router
