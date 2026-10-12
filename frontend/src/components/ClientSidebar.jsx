import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ClientSidebar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const userId = user?._id || user?.id

  const links = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Reels', path: '/reels' },
    { name: 'Saved Reels', path: '/saved' },
    { name: 'Liked Reels', path: '/liked' },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex h-dvh w-64 flex-col overflow-hidden border-r border-white/10 bg-zinc-950 p-5 text-white">
      {/* Brand */}
      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="mb-10 shrink-0 text-left text-2xl font-bold"
      >
        Taste<span className="text-orange-500">Loop</span>
      </button>

      {/* Navigation */}
      <p className="mb-3 shrink-0 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        Discover
      </p>

      <nav className="flex shrink-0 flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 transition ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-zinc-300 hover:bg-zinc-800'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout always at bottom */}
      <div className="mt-auto shrink-0 border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-xl px-4 py-3 text-left text-zinc-300 transition hover:bg-red-500/10 hover:text-red-400"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default ClientSidebar
