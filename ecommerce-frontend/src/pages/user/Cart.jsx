import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../../store/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

export default function Cart() {
  const { items } = useSelector(s => s.cart || { items: [] })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const total = (items || []).reduce(
    (sum, i) => sum + (i?.product?.price || 0) * (i?.quantity || 1),
    0
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {(!items || items.length === 0) ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link to="/" className="btn-primary">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((i, index) => (
                <div key={`${i.product?._id || 'unknown'}-${index}`} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
                  <img
                    src={`http://localhost:5000/${i.product?.images?.[0] || 'placeholder.jpg'}`}
                    className="w-20 h-20 object-cover rounded"
                    alt={i.product?.name || 'Product'}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{i.product?.name}</h3>
                    <p>₹{i.product?.price || 0} × {i.quantity || 1}</p>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(i.product?._id))}
                    className="btn-danger"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <p className="text-2xl font-bold">Total: ₹{isNaN(total) ? 0 : total}</p>
              <button onClick={() => navigate('/checkout')} className="mt-4 btn-success px-8 py-3">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
