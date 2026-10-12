import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const CreateFood = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [video, setVideo] = useState(null)
  const [preview, setPreview] = useState('')
  const [foodName, setFoodName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!video) {
      setPreview('')
      return
    }

    const url = URL.createObjectURL(video)
    setPreview(url)

    return () => URL.revokeObjectURL(url)
  }, [video])

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0]

    setMessage('')
    setError('')

    if (!file) return

    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file.')
      e.target.value = ''
      return
    }

    setVideo(file)
  }

  const handleRemoveVideo = () => {
    setVideo(null)
    const input = document.getElementById('food-video')
    if (input) input.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!video) {
      setError('Please select a video before publishing.')
      return
    }

    if (!foodName.trim() || !description.trim()) {
      setError('Please fill in all the fields.')
      return
    }

    const formData = new FormData()
    formData.append('file', video)
    formData.append('name', foodName.trim())
    formData.append('description', description.trim())

    try {
      setLoading(true)

      const response = await axios.post(
        'http://localhost:3000/api/food/',
        formData,
        { withCredentials: true }
      )

      if (response.data?.success === false) {
        throw new Error(
          response.data.message || 'Unable to create food reel.'
        )
      }

      setMessage('Food reel published successfully!')
      setVideo(null)
      setFoodName('')
      setDescription('')

      const input = document.getElementById('food-video')
      if (input) input.value = ''

      setTimeout(() => {
        const userId = user?._id || user?.id
        if (userId) navigate(`/food-partner/${userId}`)
      }, 1000)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-5 text-white sm:px-6 lg:h-screen lg:min-h-0 lg:overflow-hidden lg:px-8 lg:py-5">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        {/* Header */}
        <header className="mb-5 flex shrink-0 items-center justify-between gap-3">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Food Partner Studio
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Create your <span className="text-orange-500">food reel.</span>
            </h1>

            <p className="mt-1 text-sm text-zinc-400">
              Give your signature dish the spotlight it deserves.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 sm:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3z"
                />
              </svg>
            </span>
            <span className="text-xs font-medium text-zinc-300">
              Made for food lovers
            </span>
          </div>
        </header>

        {/* Main form card */}
        <form
          onSubmit={handleSubmit}
          className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#101010] shadow-2xl shadow-black/30 lg:grid-cols-[0.9fr_1.1fr]"
        >
          {/* Video section */}
          <section className="flex min-w-0 flex-col border-b border-white/10 p-4 sm:p-5 lg:border-b-0 lg:border-r lg:p-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                  Step 01
                </p>
                <h2 className="mt-1 text-base font-semibold">Upload your video</h2>
              </div>

              <span className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-zinc-400">
                Required
              </span>
            </div>

            <div className="relative flex min-h-[230px] flex-1 items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-[#080808] lg:min-h-0">
              {preview ? (
                <>
                  <video
                    src={preview}
                    controls
                    playsInline
                    className="h-full max-h-[430px] w-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    className="absolute right-3 top-3 rounded-lg border border-white/10 bg-black/80 px-3 py-2 text-xs font-medium text-white transition hover:border-red-500/40 hover:bg-red-500/15 hover:text-red-400"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <label
                  htmlFor="food-video"
                  className="flex h-full w-full cursor-pointer flex-col items-center justify-center px-5 py-8 text-center"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-500 transition group-hover:bg-orange-500/20">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-7 w-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16V4m0 0L7 9m5-5 5 5M5 15v4a1 1 0 001 1h12a1 1 0 001-1v-4"
                      />
                    </svg>
                  </div>

                  <span className="text-sm font-semibold text-white">
                    Drop your food video here
                  </span>

                  <span className="mt-2 max-w-[240px] text-xs leading-5 text-zinc-500">
                    Choose a video from your device to preview it before publishing.
                  </span>

                  <span className="mt-4 rounded-lg bg-orange-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-600">
                    Browse files
                  </span>
                </label>
              )}

              <input
                id="food-video"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />
            </div>

            {video ? (
              <div className="mt-3 flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M10 9l5 3-5 3V9z" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-zinc-200">
                    {video.name}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    {(video.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                <span className="text-xs text-green-400">Selected</span>
              </div>
            ) : (
              <p className="mt-3 text-xs text-zinc-500">
                Supported format depends on your browser and video file.
              </p>
            )}
          </section>

          {/* Details section */}
          <section className="flex min-w-0 flex-col p-4 sm:p-5 lg:p-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                Step 02
              </p>
              <h2 className="mt-1 text-base font-semibold">Tell us about the dish</h2>
              <p className="mt-1 text-xs text-zinc-500">
                Keep it tempting, clear, and authentic.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="food-name"
                  className="mb-2 block text-sm font-medium text-zinc-200"
                >
                  Food name <span className="text-orange-500">*</span>
                </label>

                <input
                  id="food-name"
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="e.g. Creamy Butter Paneer"
                  maxLength={100}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <label
                    htmlFor="food-description"
                    className="text-sm font-medium text-zinc-200"
                  >
                    Description <span className="text-orange-500">*</span>
                  </label>

                  <span className="text-xs text-zinc-500">
                    {description.length}/1000
                  </span>
                </div>

                <textarea
                  id="food-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What makes this dish special? Describe its flavours, ingredients, or preparation..."
                  rows={5}
                  maxLength={1000}
                  required
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 lg:resize-none"
                />
              </div>
            </div>

            <div className="mt-auto pt-5">
              {error && (
                <div
                  role="alert"
                  className="mb-3 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-xs text-red-400"
                >
                  {error}
                </div>
              )}

              {message && (
                <div
                  role="status"
                  className="mb-3 rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2.5 text-xs text-green-400"
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-950/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      />
                      <path
                        fill="currentColor"
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Publishing your reel...
                  </>
                ) : (
                  <>
                    Publish Food Reel
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14m-6-6 6 6-6 6"
                      />
                    </svg>
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-[11px] leading-5 text-zinc-500">
                Your food deserves to be discovered.
              </p>
            </div>
          </section>
        </form>
      </div>
    </main>
  )
}

export default CreateFood
