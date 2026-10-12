import React from 'react'
import { Outlet } from 'react-router-dom'
import FoodPartnerSidebar from './FoodPartnerSidebar'

const FoodPartnerLayout = () => {
  return (
    <div className="flex h-dvh overflow-hidden bg-[#090909] text-white">
      {/* Fixed sidebar */}
      <div className="hidden h-full w-64 shrink-0 md:block">
        <FoodPartnerSidebar />
      </div>

      {/* Only the right content area scrolls */}
      <main className="h-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default FoodPartnerLayout
