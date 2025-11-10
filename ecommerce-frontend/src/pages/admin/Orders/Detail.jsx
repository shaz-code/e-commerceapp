import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../utils/api'

export default function AdminOrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    API.get(`/admin/orders/${id}`).then(res => {
      setOrder(res.data)
      setStatus(res.data.status)
      setNotes(res.data.notes || '')
    })
  }, [id])

  const updateStatus = async () => {
    await API.put(`/admin/orders/${id}/status`, { status })
    setOrder({ ...order, status })
  }

  const saveNotes = async () => {
    await API.put(`/admin/orders/${id}/notes`, { notes })
    setOrder({ ...order, notes })
  }

  if (!order) return <div className="p-8 text-center">Loading...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Order #{order._id.slice(-6)}</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <p><strong>Customer:</strong> {order.user?.email}</p>
          <p><strong>Address:</strong> {order.shippingAddress}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div className="card">
          <label className="block font-semibold mb-2">Status</label>
          <div className="flex gap-2">
            <select value={status} onChange={e => setStatus(e.target.value)} className="input flex-1">
              {['Pending','Processing','Shipped','Delivered','Cancelled'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button onClick={updateStatus} className="btn-primary">Update</button>
          </div>
        </div>
      </div>
      <div className="card mb-6">
        <h3 className="font-bold mb-3">Items</h3>
        {order.items.map(i => (
          <div key={i._id} className="flex justify-between py-2 border-b">
            <span>{i.product?.name} × {i.quantity}</span>
            <span>₹{i.product?.price * i.quantity}</span>
          </div>
        ))}
      </div>
      <div className="card">
        <label className="block font-semibold mb-2">Admin Notes</label>
        <textarea
          className="input h-32"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
        <button onClick={saveNotes} className="mt-2 btn-success">Save Notes</button>
      </div>
    </div>
  )
}