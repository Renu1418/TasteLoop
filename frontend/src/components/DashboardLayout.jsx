import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientSidebar from './ClientSidebar'

const DashboardLayout = () => {
  return (
    <div className="flex h-dvh overflow-hidden bg-black text-white">
      {/* Fixed Sidebar */}
      <div className="hidden h-full w-64 shrink-0 md:block">
        <ClientSidebar />
      </div>

      {/* Only this section scrolls */}
      <main className="h-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
