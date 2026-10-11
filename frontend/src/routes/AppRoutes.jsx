
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import Home from '../pages/client/Home'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'

const AppRoutes = () => {
  const { user, loading } = useAuth()

  // Session check hone tak page render nahi karna
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading TasteLoop...
      </div>
    )
  }

  // Login ke baad user ko uske role ke according bhejna
  const getHomeRoute = () => {
    if (user?.role === 'client') return '/'
    if (user?.role === 'foodpartner') return '/create-food'
    return '/login'
  }

  return (
    <Router>
      <Routes>
        {/* Website open hone par */}
        <Route
          path="/"
          element={
            user
              ? user.role === 'client'
                ? <Home />
                : <Navigate to="/create-food" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Logged-out users ke liye Login / Register */}
        <Route
          path="/login"
          element={user ? <Navigate to={getHomeRoute()} replace /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to={getHomeRoute()} replace /> : <Register />}
        />

        {/* Sirf Food Partner */}
        <Route
          path="/create-food"
          element={
            !user
              ? <Navigate to="/login" replace />
              : user.role === 'foodpartner'
                ? <CreateFood />
                : <Navigate to="/" replace />
          }
        />

        <Route
          path="/food-partner/:id"
          element={
            !user
              ? <Navigate to="/login" replace />
              : user.role === 'client'
                ? <Profile />
                : <Navigate to="/create-food" replace />
          }
        />

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
