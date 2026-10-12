import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientSidebar from './ClientSidebar'
import MobileBottomNav from './MobileBottomNav'

const DashboardLayout = () => {
  return (
    <div className="flex h-dvh overflow-hidden bg-black text-white">
      {/* Desktop sidebar: unchanged */}
      <div className="hidden h-full w-64 shrink-0 md:block">
        <ClientSidebar />
      </div>

      {/* Scrollable content */}
      <main className="h-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile navigation only */}
      <MobileBottomNav role="client" />
    </div>
  )
}

export default DashboardLayout