import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ClientSidebar from './ClientSidebar'
import Footer from './Footer'

const DashboardLayout = () => {
  const location = useLocation()
  const isReelsPage = location.pathname === '/reels'

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main area */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:block">
          <ClientSidebar />
        </div>

        {/* Page content */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>

      {/* Full-width footer */}
      {!isReelsPage && <Footer />}
    </div>
  )
}

export default DashboardLayout