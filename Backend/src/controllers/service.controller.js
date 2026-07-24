const Service = require('../models/service.model')
const { sendSuccess } = require('../utils/apiResponse')
const asyncHandler = require('express-async-handler')

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ isActive: true })
  sendSuccess(res, 200, 'Services fetched', { services })
})

// @desc    Create a new service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body)
  sendSuccess(res, 201, 'Service created', { service })
})

module.exports = {
  getServices,
  createService,
}
