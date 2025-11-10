const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find({ deleted: false });
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id, deleted: false });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

module.exports = router;