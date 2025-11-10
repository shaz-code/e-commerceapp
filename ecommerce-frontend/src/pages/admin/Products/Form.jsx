import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../../../utils/api'

export default function AdminProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', slug: '', category: '', weight: '', price: '', stock: '', description: '', images: []
  })

  useEffect(() => {
    if (id) {
      API.get(`/admin/products/${id}`).then(res => setForm(res.data))
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    Object.keys(form).forEach(k => {
      if (k === 'images') form.images.forEach(f => data.append('images', f))
      else data.append(k, form[k])
    })

    if (id) await API.put(`/admin/products/${id}`, data)
    else await API.post('/admin/products', data)
    navigate('/admin/products')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit' : 'Add'} Product</h1>
      <form onSubmit={handleSubmit} className="card space-y-4">
        <input placeholder="Name" className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Slug" className="input" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
        <input placeholder="Category" className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <input type="number" placeholder="Weight (kg)" className="input" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} />
        <input type="number" placeholder="Price" className="input" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input type="number" placeholder="Stock" className="input" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
        <textarea placeholder="Description" className="input h-32" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input type="file" multiple className="input" onChange={e => setForm({ ...form, images: Array.from(e.target.files) })} />
        <div className="flex gap-4">
          <button type="submit" className="btn-success">Save</button>
          <button type="button" onClick={() => navigate('/admin/products')} className="btn-danger">Cancel</button>
        </div>
      </form>
    </div>
  )
}