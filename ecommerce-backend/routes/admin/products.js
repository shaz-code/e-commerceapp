const express = require('express');
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
const Product = require('../../models/Product');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith('image/'))
});

router.get('/', auth, isAdmin, async (req, res) => {
  const page = req.query.page || 1;
  const result = await Product.paginate({ deleted: false }, { page, limit: 10 });
  res.json(result);
});

router.post('/', auth, isAdmin, upload.array('images', 5), async (req, res) => {
  const { name, category, weight, price, stock, description } = req.body;
  const images = req.files?.map(f => f.path) || [];
  const product = await Product.create({ name, category, weight: +weight, price: +price, stock: +stock, description, images });
  res.json(product);
});

router.get('/:id', auth, isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

router.put('/:id', auth, isAdmin, upload.array('images', 5), async (req, res) => {
  const updates = req.body;
  if (req.files) updates.images = req.files.map(f => f.path);
  const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json(product);
});

router.delete('/:id', auth, isAdmin, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { deleted: true });
  res.json({ success: true });
});

module.exports = router;