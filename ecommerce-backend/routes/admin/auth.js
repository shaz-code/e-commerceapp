const express = require('express');
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
const User = require('../../models/User');
const router = express.Router();

router.get('/profile', auth, isAdmin, async (req, res) => {
  const admin = await User.findById(req.user._id).select('-password');
  res.json(admin);
});

module.exports = router;