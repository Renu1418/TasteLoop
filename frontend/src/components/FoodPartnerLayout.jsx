import React from 'react'
import { Outlet } from 'react-router-dom'
import FoodPartnerSidebar from './FoodPartnerSidebar'
import MobileBottomNav from './MobileBottomNav'

const FoodPartnerLayout = () => {
  return (
    <div className="flex h-dvh overflow-hidden bg-[#090909] text-white">
      {/* Desktop sidebar: unchanged */}
      <div className="hidden h-full w-64 shrink-0 md:block">
        <FoodPartnerSidebar />
      </div>

      {/* Scrollable content */}
      <main className="h-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile navigation only */}
      <MobileBottomNav role="foodpartner" />
    </div>
  )
}

export default FoodPartnerLayout