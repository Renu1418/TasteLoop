import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'

import Dashboard from '../pages/client/Dashboard'
import Home from '../pages/client/Home'
import Saved from '../pages/client/Saved'
import Liked from '../pages/client/Liked'
import ClientProfile from '../pages/client/ClientProfile'

import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'

import DashboardLayout from '../components/DashboardLayout'

const AppRoutes = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading TasteLoop...
      </div>
    )
  }

  const getHomeRoute = () => {
    if (user?.role === 'client') return '/'
    if (user?.role === 'foodpartner') return '/create-food'
    return '/login'
  }

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={
            user
              ? <Navigate to={getHomeRoute()} replace />
              : <Login />
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            user
              ? <Navigate to={getHomeRoute()} replace />
              : <Register />
          }
        />

        {/* Client Dashboard Layout */}
        <Route
          path="/"
          element={
            !user
              ? <Navigate to="/login" replace />
              : user.role === 'client'
                ? <DashboardLayout />
                : <Navigate to="/create-food" replace />
          }
        >
          {/* Default client page */}
          <Route index element={<Dashboard />} />

          {/* Existing reels page */}
          <Route path="reels" element={<Home />} />

          {/* Saved and liked reels */}
          <Route path="saved" element={<Saved />} />
          <Route path="liked" element={<Liked />} />

          {/* Client account profile */}
          <Route
            path="client-profile"
            element={<ClientProfile />}
          />
        </Route>

        {/* Food Partner Dashboard */}
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

        {/* Public food partner store page */}
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

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to={getHomeRoute()} replace />}
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes
