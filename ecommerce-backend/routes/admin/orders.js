const express = require('express');
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
const Order = require('../../models/Order');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const router = express.Router();

router.get('/', auth, isAdmin, async (req, res) => {
  const query = {};
  if (req.query.status) query.status = req.query.status;
  if (req.query.search) query.$or = [{ _id: req.query.search }, { 'user.email': { $regex: req.query.search, $options: 'i' } }];
  const result = await Order.paginate(query, { page: req.query.page || 1, limit: 10, populate: 'user items.product' });
  res.json(result);
});

router.get('/:id', auth, isAdmin, async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user items.product');
  if (!order) return res.status(404).json({ message: 'Not found' });
  res.json(order);
});

router.put('/:id/status', auth, isAdmin, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json({ success: true, order });
});

router.put('/:id/notes', auth, isAdmin, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { notes: req.body.notes }, { new: true });
  res.json({ success: true, order });
});

router.post('/export', auth, isAdmin, async (req, res) => {
  const orders = await Order.find({ _id: { $in: req.body.ids } }).populate('user');
  const csvWriter = createCsvWriter({
    path: 'orders.csv',
    header: [
      { id: '_id', title: 'Order ID' },
      { id: 'user.email', title: 'Customer' },
      { id: 'total', title: 'Total' },
      { id: 'status', title: 'Status' },
      { id: 'createdAt', title: 'Date' },
    ],
  });
  await csvWriter.writeRecords(orders);
  res.download('orders.csv');
});

module.exports = router;