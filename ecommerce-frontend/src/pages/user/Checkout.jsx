import { useState } from 'react'
import { useSelector } from 'react-redux'
import API from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

export default function Checkout() {
  const { items } = useSelector(s => s.cart || { items: [] })
  const { token } = useSelector(s => s.auth || {})
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

  const total = (items || []).reduce(
    (s, i) => s + (i?.product?.price || 0) * (i?.quantity || 1),
    0
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) return navigate('/login')
    if (!address) return alert('Enter address')

    try {
      const res = await API.post(
        '/orders',
        {
          items: items.map(i => ({
            product: i.product?._id,
            quantity: i.quantity
          })),
          shippingAddress: address,
          total
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.status === 200 || res.status === 201) {
        alert('Order placed successfully!')
        navigate('/')
      } else {
        alert('Order failed. Please try again.')
      }
    } catch (err) {
      console.error('Order Error:', err.response?.data || err.message)
      alert(`Order failed: ${err.response?.data?.message || 'Unexpected error'}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label className="block font-semibold mb-2">Shipping Address</label>
            <textarea
              className="input h-32"
              placeholder="Full address"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">Total: ₹{isNaN(total) ? 0 : total}</p>
            <button type="submit" className="mt-4 btn-success px-8 py-3">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
