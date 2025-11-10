import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../utils/api'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'
import Navbar from '../../components/Navbar'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setProduct(res.data))
  }, [id])

  if (!product) return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={`http://localhost:5000/${product.images[0]}`}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl shadow"
          />
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <p className="text-2xl text-green-600 font-bold mb-4">₹{product.price}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
              <div><strong>Category:</strong> {product.category}</div>
              <div><strong>Weight:</strong> {product.weight}kg</div>
              <div><strong>Stock:</strong> {product.stock}</div>
            </div>
            <button
              onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
              className="w-full btn-primary py-3 text-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}