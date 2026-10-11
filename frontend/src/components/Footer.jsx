import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#080808]">
      <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-5 px-5 py-7 sm:flex-row sm:px-8 lg:px-10">

        {/* Brand */}
        <Link to="/" className="text-xl font-bold tracking-tight text-white">
          Taste<span className="text-orange-500">Loop</span>
        </Link>

        {/* Tagline */}
        <p className="text-center text-xs text-zinc-500 sm:text-sm">
          Discover food. Share the vibe.
          <span className="mx-2 text-zinc-700">|</span>
          <span className="text-orange-400">
            © {new Date().getFullYear()} TasteLoop
          </span>
        </p>

      </div>
    </footer>
  )
}

export default Footer
