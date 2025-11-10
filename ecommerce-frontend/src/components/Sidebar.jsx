import { Link, useLocation } from 'react-router-dom'
import { Package, ShoppingBag, Home, LogOut } from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <aside className="w-64 bg-indigo-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-2">
        <Link
          to="/admin"
          className={`flex items-center gap-3 p-3 rounded-lg transition ${
            isActive('/admin') && !isActive('/admin/products') && !isActive('/admin/orders')
              ? 'bg-indigo-700'
              : 'hover:bg-indigo-700'
          }`}
        >
          <Home size={20} />
          Dashboard
        </Link>
        <Link
          to="/admin/products"
          className={`flex items-center gap-3 p-3 rounded-lg transition ${
            isActive('/admin/products') ? 'bg-indigo-700' : 'hover:bg-indigo-700'
          }`}
        >
          <Package size={20} />
          Products
        </Link>
        <Link
          to="/admin/orders"
          className={`flex items-center gap-3 p-3 rounded-lg transition ${
            isActive('/admin/orders') ? 'bg-indigo-700' : 'hover:bg-indigo-700'
          }`}
        >
          <ShoppingBag size={20} />
          Orders
        </Link>
      </nav>
    </aside>
  )
}