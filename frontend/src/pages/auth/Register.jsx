
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [role, setRole] = useState('client')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const fullname = e.target.fullname.value
    const email = e.target.email.value
    const password = e.target.password.value

    const userData = { fullname, email, password, role }

    if (role === 'foodpartner') {
      userData.businessName = e.target.businessName.value
      userData.phone = e.target.phone.value
      userData.address = e.target.address.value
    }

    try {
      const response = await api.post(
        '/api/auth/user/register',
        userData
      )

      login(response.data.user)

      if (role === 'client') navigate('/')
      else navigate('/create-food')
    } catch (err) {
      console.error('Registration error:', err)

      setError(
        err.response?.data?.message ||
        'Registration failed. Please try again.'
      )
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'

  const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-300'

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-8 text-white">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-orange-600/10 blur-[100px]" />

      <Link to="/" className="absolute left-6 top-6 text-2xl font-extrabold">
        Taste<span className="text-orange-500">Loop</span>
      </Link>

      <main className="relative my-12 w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-orange-950/10 sm:p-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
          🍽️
        </div>

        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Join TasteLoop and discover something delicious.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className={labelClass}>Register as</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'client', label: 'Client' },
                { value: 'foodpartner', label: 'Food Partner' },
              ].map((item) => (
                <label key={item.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={item.value}
                    checked={role === item.value}
                    onChange={(e) => setRole(e.target.value)}
                    className="peer sr-only"
                  />
                  <div className="rounded-xl border border-white/10 bg-zinc-900 px-3 py-3 text-center text-sm transition peer-checked:border-orange-500 peer-checked:bg-orange-500/10 peer-checked:text-orange-400">
                    {item.label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {role === 'foodpartner' && (
            <div>
              <label htmlFor="businessName" className={labelClass}>
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                placeholder="Enter business name"
                className={inputClass}
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="fullname" className={labelClass}>
              Full Name
            </label>
            <input
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              className={inputClass}
              required
            />
          </div>

          {role === 'foodpartner' && (
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                className={inputClass}
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className={inputClass}
              required
            />
          </div>

          {role === 'foodpartner' && (
            <div>
              <label htmlFor="address" className={labelClass}>
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={2}
                placeholder="Enter your address"
                className={`${inputClass} resize-none`}
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              className={inputClass}
              required
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3.5 text-sm font-semibold transition hover:bg-orange-600 active:scale-[0.99]"
          >
            Create Account →
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-orange-500 transition hover:text-orange-400"
          >
            Login
          </Link>
        </p>
      </main>
    </div>
  )
}

export default Register
