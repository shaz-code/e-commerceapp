// src/pages/user/Checkout.jsx
import { useState } from 'react'
import { useSelector } from 'react-redux'
import API from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

export default function Checkout() {
  const { items = [] } = useSelector(s => s.cart || {})
  const { token } = useSelector(s => s.auth || {})
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

  const total = items.reduce((sum, i) => sum + (i.quantity || 0) * (i.product?.price || 0), 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) return navigate('/login')
    if (!address.trim()) return alert('Please enter shipping address')

    try {
      await API.post('/orders', {
        items: items.map(i => ({
          product: i.product,      // Now it's just the ID string
          quantity: i.quantity
        })),
        shippingAddress: address,
        total
      })

      alert('Order placed successfully!')
      navigate('/')
    } catch (err) {
      console.error('Order Error:', err.response?.data)
      alert(err.response?.data?.message || 'Order failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
          <div className="mb-6">
            <label className="block font-semibold mb-2">Shipping Address</label>
            <textarea
              className="w-full p-3 border rounded-lg h-32"
              placeholder="Enter full address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="text-right">
            <p className="text-xl font-bold mb-4">Total: ₹{total}</p>
            <button type="submit" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}