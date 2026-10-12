
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  House,
  Clapperboard,
  UserRound,
  PlusSquare,
  Bookmark,
  Heart,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const MobileBottomNav = ({ role }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [profileOpen, setProfileOpen] = useState(false)

  const isFoodPartner = role === 'foodpartner'
  const userId = user?._id || user?.id

  useEffect(() => {
    setProfileOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    try {
      setProfileOpen(false)
      await logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navItems = isFoodPartner
    ? [
        {
          name: 'Create Reel',
          path: '/create-food',
          icon: PlusSquare,
        },
      ]
    : [
        {
          name: 'Home',
          path: '/',
          icon: House,
          end: true,
        },
        {
          name: 'Reels',
          path: '/reels',
          icon: Clapperboard,
        },
      ]

  const profilePath = isFoodPartner
    ? userId
      ? `/food-partner/${userId}`
      : '/create-food'
    : '/client-profile'

  const menuItems = isFoodPartner
    ? [
        {
          name: 'My Profile',
          path: profilePath,
          icon: UserRound,
        },
      ]
    : [
        {
          name: 'My Profile',
          path: '/client-profile',
          icon: UserRound,
        },
        {
          name: 'Saved Reels',
          path: '/saved',
          icon: Bookmark,
        },
        {
          name: 'Liked Reels',
          path: '/liked',
          icon: Heart,
        },
      ]

  const isProfileActive = isFoodPartner
    ? location.pathname.startsWith('/food-partner/')
    : ['/client-profile', '/saved', '/liked'].includes(
        location.pathname
      )

  return (
    <>
      {/* Profile popup and outside-click backdrop */}
      {profileOpen && (
        <>
          <button
            type="button"
            aria-label="Close profile menu"
            className="fixed inset-0 z-[70] bg-black/30 md:hidden"
            onClick={() => setProfileOpen(false)}
          />

          <div className="fixed bottom-[82px] right-3 z-[80] w-64 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-2 text-white shadow-2xl md:hidden">
            <div className="border-b border-white/10 px-3 py-3">
              <p className="text-sm font-semibold">
                {isFoodPartner ? 'Food Partner' : 'My Account'}
              </p>

              {user?.fullname && (
                <p className="mt-1 truncate text-xs text-zinc-400">
                  {user.fullname}
                </p>
              )}

              {user?.email && (
                <p className="mt-1 truncate text-xs text-zinc-500">
                  {user.email}
                </p>
              )}
            </div>

            <div className="py-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const active = location.pathname === item.path

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setProfileOpen(false)
                      navigate(item.path)
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                      active
                        ? 'bg-orange-500/10 text-orange-400'
                        : 'text-zinc-200 hover:bg-white/5'
                    }`}
                  >
                    <Icon size={19} />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>

            <div className="border-t border-white/10 pt-1">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10"
              >
                <LogOut size={19} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-zinc-950 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.25)] md:hidden">
        <div
          className={`mx-auto flex min-h-[68px] max-w-lg items-center px-4 ${
            isFoodPartner ? 'justify-evenly' : 'justify-around'
          }`}
        >
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex min-w-[76px] flex-col items-center justify-center gap-1 py-2 text-xs transition ${
                    isActive
                      ? 'text-orange-500'
                      : 'text-zinc-400 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={23}
                      strokeWidth={isActive ? 2.5 : 1.8}
                    />
                    <span className="font-medium">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            )
          })}

          <button
            type="button"
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((prev) => !prev)}
            className={`flex min-w-[76px] flex-col items-center justify-center gap-1 py-2 text-xs transition ${
              profileOpen || isProfileActive
                ? 'text-orange-500'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <UserRound
              size={23}
              strokeWidth={
                profileOpen || isProfileActive ? 2.5 : 1.8
              }
            />
            <span className="font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </>
  )
}

export default MobileBottomNav
