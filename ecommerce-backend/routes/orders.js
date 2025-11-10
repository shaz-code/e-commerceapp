// backend/routes/orders.js
const express = require('express')
const auth = require('../middleware/auth')
const Order = require('../models/Order')
const Product = require('../models/Product')
const router = express.Router()

router.post('/', auth, async (req, res) => {
  const { items, shippingAddress, total } = req.body

  if (!items?.length) return res.status(400).json({ message: 'No items in order' })
  if (!shippingAddress?.trim()) return res.status(400).json({ message: 'Shipping address required' })

  let calculatedTotal = 0
  const orderItems = []

  try {
    for (const item of items) {
      const product = await Product.findById(item.product).select('price stock deleted')
      if (!product || product.deleted) {
        return res.status(400).json({ message: `Product not found: ${item.product}` })
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` })
      }

      calculatedTotal += product.price * item.quantity
      orderItems.push({ product: product._id, quantity: item.quantity })

      // Reduce stock
      product.stock -= item.quantity
      await product.save()
    }

    if (Math.abs(calculatedTotal - total) > 0.01) {
      return res.status(400).json({ message: 'Total amount mismatch' })
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      total
    })

    res.status(201).json(order)
  } catch (err) {
    console.error('Order creation error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router