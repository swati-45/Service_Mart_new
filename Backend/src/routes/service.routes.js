const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/auth.middleware')
const { isAdmin } = require('../middlewares/role.middleware')
const {
  getServices,
  createService,
} = require('../controllers/service.controller')

// Routes
router.route('/')
  .get(getServices)
  .post(protect, isAdmin, createService)

module.exports = router
