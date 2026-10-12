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
import FoodPartnerLayout from '../components/FoodPartnerLayout'

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
        <Route
          path="/login"
          element={
            user
              ? <Navigate to={getHomeRoute()} replace />
              : <Login />
          }
        />

        <Route
          path="/register"
          element={
            user
              ? <Navigate to={getHomeRoute()} replace />
              : <Register />
          }
        />

        {/* CLIENT PAGES */}
        <Route
          path="/"
          element={
            !user
              ? <Navigate to="/login" replace />
              : user.role === 'client'
                ? <DashboardLayout />
                : user.role === 'foodpartner'
                  ? <FoodPartnerLayout />
                  : <Navigate to="/login" replace />
          }
        >
          {/* Client routes */}
          <Route index element={<Dashboard />} />
          <Route path="reels" element={<Home />} />
          <Route path="saved" element={<Saved />} />
          <Route path="liked" element={<Liked />} />
          <Route path="client-profile" element={<ClientProfile />} />

          {/* Food Partner routes */}
          <Route path="create-food" element={<CreateFood />} />
          <Route path="food-partner/:id" element={<Profile />} />
        </Route>

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to={getHomeRoute()} replace />}
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes
