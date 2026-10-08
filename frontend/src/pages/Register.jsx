import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4 py-5">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your account
          </h1>

          <p className="mt-1 text-sm opacity-70">
            Join TasteLoop and discover great food
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-sm">

          <form className="space-y-3.5">

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
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="mb-1.5 block text-sm font-medium"
              >
                Address
              </label>

              <textarea
                id="address"
                rows="2"
                placeholder="Enter your address"
                className="w-full resize-none rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
              />
            </div>

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
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
              />
            </div>

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
                type="password"
                placeholder="Create a password"
                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm outline-none transition placeholder:opacity-50 focus:border-[var(--primary)]"
              />
            </div>

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
                    className="peer sr-only"
                  />

                  <div className="rounded-lg border border-[var(--border)] px-3 py-2.5 text-center text-sm transition peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)] peer-checked:text-[var(--primary-foreground)]">
                    Food Partner
                  </div>
                </label>

              </div>
            </div>

            {/* Register Button */}
            <button
              type="button"
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