import { useEffect, useState } from 'react'
import API from '../../../utils/api'
import { Link } from 'react-router-dom'

export default function AdminProductsList() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    API.get(`/admin/products?page=${page}&search=${search}`)
      .then(res => setProducts(res.data.docs || []))
  }, [page, search])

  const handleDelete = async (id) => {
    if (!confirm('Delete product?')) return
    await API.delete(`/admin/products/${id}`)
    setProducts(products.filter(p => p._id !== id))
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link to="/admin/products/new" className="btn-primary">Add Product</Link>
      </div>
      <input
        type="text"
        placeholder="Search by name/slug"
        className="input mb-6"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-t">
                <td className="p-4"><img src={`http://localhost:5000/${p.images[0]}`} className="w-12 h-12 object-cover rounded" /></td>
                <td className="p-4">{p.name}</td>
                <td className="p-4">₹{p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">
                  <Link to={`/admin/products/${p._id}`} className="text-indigo-600 mr-3">Edit</Link>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6 gap-2">
        <button onClick={() => setPage(p => Math.max(1, p-1))} className="px-4 py-2 border rounded">Prev</button>
        <span className="px-4 py-2">Page {page}</span>
        <button onClick={() => setPage(p => p+1)} className="px-4 py-2 border rounded">Next</button>
      </div>
    </div>
  )
}