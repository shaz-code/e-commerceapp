import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { lazy, Suspense } from 'react'

// Lazy load pages
const Home = lazy(() => import('./pages/user/Home'))
const Login = lazy(() => import('./pages/user/Login'))
const Register = lazy(() => import('./pages/user/Register'))
const ProductDetail = lazy(() => import('./pages/user/ProductDetail'))
const Cart = lazy(() => import('./pages/user/Cart'))
const Checkout = lazy(() => import('./pages/user/Checkout'))

const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminLayout = lazy(() => import('./pages/admin/Layout'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminProductsList = lazy(() => import('./pages/admin/Products/List'))
const AdminProductForm = lazy(() => import('./pages/admin/Products/Form'))
const AdminOrdersList = lazy(() => import('./pages/admin/Orders/List'))
const AdminOrderDetail = lazy(() => import('./pages/admin/Orders/Detail'))

function ProtectedRoute({ children, adminOnly }) {
  const { token, role } = useSelector(s => s.auth)
  if (!token) return <Navigate to="/login" />
  if (adminOnly && role !== 'admin') return <Navigate to="/" />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminProductsList />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminProductForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/:id"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminProductForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminOrdersList />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders/:id"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminOrderDetail />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}