import { useEffect, useState } from 'react'
import API from '../../../utils/api'
import { Link } from 'react-router-dom'

export default function AdminOrdersList() {
  const [orders, setOrders] = useState([])
  const [filters, setFilters] = useState({ status: '', search: '', page: 1 })
  const [selected, setSelected] = useState([])

  useEffect(() => {
    const q = new URLSearchParams(filters).toString()
    API.get(`/admin/orders?${q}`).then(res => setOrders(res.data.docs || []))
  }, [filters])

  const exportCSV = async () => {
    if (selected.length === 0) return alert('Select orders')
    const res = await API.post('/admin/orders/export', { ids: selected }, { responseType: 'blob' })
    const url = URL.createObjectURL(res.data)
    const a = document.createElement('a')
    a.href = url
    a.download = 'orders.csv'
    a.click()
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <button onClick={exportCSV} className="btn-primary">Export CSV</button>
      </div>
      <div className="flex gap-4 mb-6">
        <select className="input" onChange={e => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Status</option>
          {['Pending','Processing','Shipped','Delivered','Cancelled'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          placeholder="Search by ID/email"
          className="input flex-1"
          onChange={e => setFilters({ ...filters, search: e.target.value })}
        />
      </div>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4"><input type="checkbox" /></th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td className="p-4">
                  <input
                    type="checkbox"
                    onChange={e => {
                      if (e.target.checked) setSelected([...selected, o._id])
                      else setSelected(selected.filter(id => id !== o._id))
                    }}
                  />
                </td>
                <td className="p-4">{o._id.slice(-6)}</td>
                <td className="p-4">{o.user?.email}</td>
                <td className="p-4">₹{o.total}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    o.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    o.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>{o.status}</span>
                </td>
                <td className="p-4">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <Link to={`/admin/orders/${o._id}`} className="text-indigo-600">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}