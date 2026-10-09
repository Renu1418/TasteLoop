import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'



const AppRoutes = () => {
  return (
    
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
             <Route path="/create-food" element={<CreateFood />} />
             <Route path="/food-partner/:id" element={<Profile />} />
        </Routes>
    </Router>
    
  )
}

export default AppRoutes
