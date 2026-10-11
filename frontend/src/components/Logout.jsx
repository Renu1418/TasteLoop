import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Logout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-xl bg-red-500/10 px-4 py-3 font-semibold text-red-400 transition hover:bg-red-500/20"
    >
      Logout
    </button>
  )
}

export default Logout
