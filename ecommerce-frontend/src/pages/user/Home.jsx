import { useEffect, useState } from 'react'
import API from '../../utils/api'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    API.get('/products').then(res => setProducts(res.data || [])).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <Link
              key={p._id}
              to={`/product/${p._id}`}
              className="card hover:shadow-lg transition-shadow"
            >
              <img
                src={`http://localhost:5000/${p.images[0]}`}
                alt={p.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-green-600 font-bold">₹{p.price}</p>
                <p className="text-sm text-gray-600">{p.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}