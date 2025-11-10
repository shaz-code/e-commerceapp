require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')
const Product = require('../models/Product')  
const connectDB = require('../config/db')

connectDB()

const seed = async () => {
  try {
    await User.deleteMany({})
    await Product.deleteMany({})

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'Admin@12345',
      role: 'admin'
    })
    console.log('Admin created:', admin.email)

    const products = [
      {
        name: 'MacBook Pro',
        slug: 'macbook-pro',
        category: 'Electronics',
        weight: 1.4,
        price: 1999,
        stock: 10,
        images: ['https://via.placeholder.com/300'],
        description: 'High-end laptop'
      },
      {
        name: 'iPhone 15',
        slug: 'iphone-15',
        category: 'Electronics',
        weight: 0.2,
        price: 999,
        stock: 15,
        images: ['https://via.placeholder.com/300'],
        description: 'Latest iPhone'
      },
      {
        name: 'Dell XPS 13',
        slug: 'dell-xps-13',
        category: 'Electronics',
        weight: 1.2,
        price: 1299,
        stock: 8,
        images: ['https://via.placeholder.com/300'],
        description: 'Ultrabook'
      },
      {
        name: 'Samsung Galaxy S24',
        slug: 'samsung-galaxy-s24',
        category: 'Electronics',
        weight: 0.18,
        price: 899,
        stock: 20,
        images: ['https://via.placeholder.com/300'],
        description: 'Flagship Android'
      },
      {
        name: 'AirPods Pro',
        slug: 'airpods-pro',
        category: 'Electronics',
        weight: 0.05,
        price: 249,
        stock: 30,
        images: ['https://via.placeholder.com/300'],
        description: 'Wireless earbuds'
      }
    ]

    await Product.insertMany(products)
    console.log('Products seeded:', products.length)

    process.exit()
  } catch (err) {
    console.error('Seed error:', err.message)
    process.exit(1)
  }
}

seed()