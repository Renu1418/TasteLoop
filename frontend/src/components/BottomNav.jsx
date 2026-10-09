
import React from 'react'

const BottomNav = ({ activeTab, onChange }) => {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/95 px-8 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl">
      <div className="mx-auto flex max-w-xs items-center justify-around">
        <button
          type="button"
          onClick={() => onChange('home')}
          className={`flex min-w-16 flex-col items-center gap-1 py-1 text-xs transition ${
            activeTab === 'home'
              ? 'text-white'
              : 'text-zinc-500 hover:text-white'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V10Z" />
          </svg>
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => onChange('saved')}
          className={`flex min-w-16 flex-col items-center gap-1 py-1 text-xs transition ${
            activeTab === 'saved'
              ? 'text-white'
              : 'text-zinc-500 hover:text-white'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={activeTab === 'saved' ? 'white' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z" />
          </svg>
          <span>Saved</span>
        </button>
      </div>
    </nav>
  )
}

export default BottomNav