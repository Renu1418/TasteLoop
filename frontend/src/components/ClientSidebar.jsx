import React from 'react'
import { NavLink } from 'react-router-dom'

const ClientSidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/' },
    { name: 'Reels', path: '/reels' },
    { name: 'Saved Reels', path: '/saved' },
    { name: 'Liked Reels', path: '/liked' }
  ]

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-white/10 bg-zinc-950 p-5 text-white">
      <h1 className="mb-10 text-2xl font-bold">
        Taste<span className="text-orange-500">Loop</span>
      </h1>

      <nav className="flex flex-col gap-2">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
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
    </aside>
  )
}

export default ClientSidebar
