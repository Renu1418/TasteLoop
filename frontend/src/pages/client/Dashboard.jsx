import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const foodHighlights = [
  {
    name: 'Loaded Pizza',
    category: 'Pizza & Italian',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Fresh & Healthy',
    category: 'Salads & Bowls',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Sweet Treats',
    category: 'Desserts',
    image:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85'
  }
]

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* Header */}
      <header className="flex items-center gap-3 border-b border-white/10 px-5 py-5 sm:px-8 lg:px-10">
        <div>
          <p className="text-xs text-zinc-400 sm:text-sm">
            DISCOVER SOMETHING DELICIOUS
          </p>

          <h1 className="mt-1 text-xl font-bold sm:text-2xl">
            Hey, {user?.fullname?.split(' ')[0] || 'Foodie'}!
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] space-y-10 px-4 py-6 sm:space-y-12 sm:px-8 sm:py-8 lg:px-10">

        {/* Hero */}
        <section className="relative isolate min-h-[290px] overflow-hidden rounded-3xl sm:min-h-[350px]">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=90"
            alt="A delicious spread of freshly prepared food"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/75 to-black/10" />

          <div className="flex min-h-[290px] max-w-2xl flex-col items-start justify-center p-6 sm:min-h-[350px] sm:p-10 lg:p-14">
            <span className="rounded-full border border-orange-400/40 bg-black/40 px-3 py-1.5 text-xs font-medium text-orange-300 sm:text-sm">
              YOUR FOOD, YOUR VIBE
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Cravings?
              <br />
              <span className="text-orange-400">
                We get you.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-200 sm:text-base">
              Discover mouth-watering dishes, meet food creators
              and find your next favourite bite.
            </p>
          </div>
        </section>

        {/* Handpicked Inspiration */}
        <section>
          <div className="mb-5">
            <p className="text-sm font-medium text-orange-400">
              HANDPICKED INSPIRATION
            </p>

            <h2 className="mt-1 text-xl font-bold sm:text-2xl">
              Good food, great mood
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {foodHighlights.map(food => (
              <div
                key={food.name}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
              >
                <div className="relative h-48 overflow-hidden sm:h-56">
                  <img
                    src={food.image}
                    alt={food.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
                    Discover on TasteLoop
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold">
                    {food.name}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    {food.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Saved Collection */}
        <Link
          to="/saved"
          className="flex items-center justify-between gap-4 rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/15 via-zinc-900 to-zinc-900 p-5 transition hover:border-orange-500/40 sm:p-7"
        >
          <div>
            <p className="text-sm font-medium text-orange-400">
              YOUR PERSONAL COLLECTION
            </p>

            <h2 className="mt-2 text-lg font-bold sm:text-2xl">
              Keep the good stuff close.
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Revisit the food reels you saved.
            </p>
          </div>

          <span className="shrink-0 text-3xl sm:text-4xl">
            🔖
          </span>
        </Link>

      </main>
    </div>
  )
}

export default Dashboard