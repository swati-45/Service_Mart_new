const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/auth.middleware')
const { isAdmin } = require('../middlewares/role.middleware')
const upload = require("../middlewares/upload.middleware");
const {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
  getUsers,
} = require('../controllers/user.controller')

// Routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

  router.post(
  "/profile/image",
  protect,
  upload.single("image"),
  uploadProfileImage
);

router.route('/')
  .get(protect, isAdmin, getUsers)

module.exports = router
