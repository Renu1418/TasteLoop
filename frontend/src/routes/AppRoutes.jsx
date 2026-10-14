import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'
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

  const home = user?.role === 'foodpartner' ? '/create-food' : '/'

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={user ? <Navigate to={home} replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={home} replace /> : <Register />}/>

        {/* Client routes */}
        <Route element={<ProtectedRoute role="client" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reels" element={<Home />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/liked" element={<Liked />} />
            <Route path="/client-profile" element={<ClientProfile />} />
          </Route>
        </Route>

        {/* Food Partner routes */}
        <Route element={<ProtectedRoute role="foodpartner" />}>
          <Route element={<FoodPartnerLayout />}>
            <Route path="/create-food" element={<CreateFood />} />
            <Route path="/food-partner/:id" element={<Profile />} />
          </Route>
        </Route>

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to={home} replace />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes