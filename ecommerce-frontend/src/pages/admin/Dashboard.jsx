import { useEffect, useState } from 'react'
import API from '../../utils/api'
import KPI from '../../components/KPI'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0, pendingOrders: 0, totalRevenue: 0, totalProducts: 0
  })

  useEffect(() => {
    API.get('/admin/dashboard').then(res => setStats(res.data)).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPI title="Total Orders" value={stats.totalOrders} color="blue" />
        <KPI title="Pending Orders" value={stats.pendingOrders} color="yellow" />
        <KPI title="Total Revenue" value={`₹${stats.totalRevenue}`} color="green" />
        <KPI title="Total Products" value={stats.totalProducts} color="purple" />
      </div>
      <div className="flex gap-4">
        <Link to="/admin/products/new" className="btn-primary">Add Product</Link>
        <Link to="/admin/orders" className="btn-success">View Orders</Link>
      </div>
    </div>
  )
}