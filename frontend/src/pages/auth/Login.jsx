import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/user/login',
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      )
  
      console.log(response.data)

      const role = response.data.user.role

      if (role === 'client') {
        navigate('/')
      } else if (role === 'foodpartner') {
        navigate('/create-food')
      }

    } catch (err) {
      console.log(err.response?.data || err)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm opacity-70">
            Login to your TasteLoop account
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-medium text-[var(--primary-foreground)] transition hover:opacity-90"
            >
              Login
            </button>

          </form>

          <p className="mt-6 text-center text-sm opacity-70">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-[var(--foreground)] underline underline-offset-4 hover:opacity-70"
            >
              Register
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Login