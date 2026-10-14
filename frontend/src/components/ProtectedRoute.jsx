import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ role }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading TasteLoop...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === 'client' ? '/' : '/create-food'}
        replace
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute
