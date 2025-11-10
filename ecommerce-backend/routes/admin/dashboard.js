const express = require('express');
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
const Order = require('../../models/Order');
const Product = require('../../models/Product');
const router = express.Router();

router.get('/', auth, isAdmin, async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: 'Pending' });
  const revenue = (await Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]))[0]?.total || 0;
  const totalProducts = await Product.countDocuments({ deleted: false });
  res.json({ totalOrders, pendingOrders, totalRevenue: revenue, totalProducts });
});

module.exports = router;