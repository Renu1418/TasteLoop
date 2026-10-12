
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const response = await api.post(
        '/api/auth/user/login',
        { email, password }
      )

      login(response.data.user)

      const role = response.data.user.role
      if (role === 'client') navigate('/')
      else if (role === 'foodpartner') navigate('/create-food')
    } catch (err) {
      console.log(err.response?.data || err)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-8 text-white">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-orange-600/10 blur-[100px]" />

      <Link to="/" className="absolute left-6 top-6 text-2xl font-extrabold">
        Taste<span className="text-orange-500">Loop</span>
      </Link>

      <main className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-7 shadow-2xl shadow-orange-950/10 sm:p-9">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
          🍽️
        </div>

        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Login to discover delicious food reels.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3.5 font-semibold transition hover:bg-orange-600 active:scale-[0.99]"
          >
            Login to TasteLoop →
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-zinc-500">NEW TO TASTELOOP?</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <p className="text-center text-sm text-zinc-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-orange-500 hover:text-orange-400">
            Sign up
          </Link>
        </p>
      </main>
    </div>
  )
}

export default Login
