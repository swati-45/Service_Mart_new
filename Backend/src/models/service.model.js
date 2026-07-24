// models/Service.js
// Master list of all service categories
// Admin creates these, providers offer them

const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,   // emoji or icon name
      default: '🔧',
    },
    description: String,
    startingPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['electrical', 'plumbing', 'cleaning',
             'painting', 'appliance', 'ac', 'carpentry', 'other'],
      default: 'other',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service
