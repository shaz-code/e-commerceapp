const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { items, shippingAddress } = req.body;
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product || product.stock < item.quantity) return res.status(400).json({ message: 'Stock issue' });
    total += product.price * item.quantity;
    product.stock -= item.quantity;
    await product.save();
  }
  const order = await Order.create({ user: req.user._id, items, shippingAddress, total });
  res.json(order);
});

module.exports = router;