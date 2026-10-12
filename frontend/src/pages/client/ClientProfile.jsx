import React from 'react'
import { useAuth } from '../../context/AuthContext'

const ClientProfile = () => {
  const { user } = useAuth()

  const profileFields = [
    { label: 'Full Name', value: user?.fullname },
    { label: 'Email Address', value: user?.email },
    { label: 'Phone Number', value: user?.phone },
    { label: 'Address', value: user?.address },
    { label: 'Account Type', value: user?.role }
  ]

  return (
    <div className="min-h-screen bg-black p-5 text-white sm:p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">My Profile</h1>

        <p className="mt-2 text-zinc-400">
          View your TasteLoop account information.
        </p>

        <section className="mt-8 rounded-2xl border border-white/10 bg-zinc-900 p-6">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold">
              {(user?.fullname || 'U').charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {user?.fullname || 'User'}
              </h2>

              <p className="text-sm text-zinc-400">
                TasteLoop Client
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {profileFields.map(field => (
              <div
                key={field.label}
                className="border-b border-white/10 pb-4 last:border-0"
              >
                <p className="text-sm text-zinc-400">
                  {field.label}
                </p>

                <p className="mt-1 break-words font-medium capitalize">
                  {field.value || 'Not provided'}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ClientProfile
