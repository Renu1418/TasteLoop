import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const navigate = useNavigate()
  const [role, setRole] = useState('client')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Client registration
    if (role === 'client') {

      const fullname = e.target.fullname.value
      const email = e.target.email.value
      const password = e.target.password.value

      try {
        const response = await axios.post(
          'http://localhost:3000/api/auth/user/register',
          {
            fullname,
            email,
            password,
            role
          },
          {
            withCredentials: true
          }
        )

        console.log(response.data)
        navigate('/')

      } catch (err) {
        console.log(err.response?.data || err)
      }

    }

    // Food Partner registration
    else if (role === 'foodpartner') {

      const businessName = e.target.businessName.value
      const fullname = e.target.fullname.value
      const phone = e.target.phone.value
      const email = e.target.email.value
      const address = e.target.address.value
      const password = e.target.password.value

      try {
        const response = await axios.post(
          'http://localhost:3000/api/auth/user/register',
          {
            businessName,
            fullname,
            phone,
            email,
            address,
            password,
            role
          },
          {
            withCredentials: true
          }
        )

        console.log(response.data)
        navigate('/create-food')

      } catch (err) {
        console.log(err.response?.data || err)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4 py-5">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your account
          </h1>

          <p className="mt-1 text-sm opacity-70">
            Join TasteLoop today
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-sm">

          <form onSubmit={handleSubmit} className="space-y-3.5">

            {/* Role */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Register as
              </label>

              <div className="grid grid-cols-2 gap-3">

                {/* Client */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="client"
                    checked={role === 'client'}
                    onChange={(e) => setRole(e.target.value)}
                    className="peer sr-only"
                  />

                  <div className="rounded-lg border border-[var(--border)] px-3 py-2.5 text-center text-sm transition peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)] peer-checked:text-[var(--primary-foreground)]">
                    Client
                  </div>
                </label>

                {/* Food Partner */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="foodpartner"
                    checked={role === 'foodpartner'}
                    onChange={(e) => setRole(e.target.value)}
                    className="peer sr-only"
                  />

                  <div className="rounded-lg border border-[var(--border)] px-3 py-2.5 text-center text-sm transition peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)] peer-checked:text-[var(--primary-foreground)]">
                    Food Partner
                  </div>
                </label>

              </div>
            </div>

            {/* Business Name - Food Partner */}
            {role === 'foodpartner' && (
              <div>
                <label
                  htmlFor="businessName"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Business Name
                </label>

                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  placeholder="Enter your business name"
                  className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
                  required
                />
              </div>
            )}

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className="mb-1.5 block text-sm font-medium"
              >
                Full Name
              </label>

              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
                required
              />
            </div>

            {/* Phone - Food Partner only */}
            {role === 'foodpartner' && (
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
                required
              />
            </div>

            {/* Address - Food Partner only */}
            {role === 'foodpartner' && (
              <div>
                <label
                  htmlFor="address"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="2"
                  placeholder="Enter your address"
                  className="w-full resize-none rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
                  required
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition hover:opacity-90"
            >
              Create Account
            </button>

          </form>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm opacity-70">
            Already have an account?{' '}

            <Link
              to="/login"
              className="font-medium text-[var(--foreground)] underline underline-offset-4 hover:opacity-70"
            >
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Register