import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
  const navigate = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // ================= VIDEO SELECT =================

  const handleVideoChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
    }

    setSelectedVideo(file)
  
    const previewUrl = URL.createObjectURL(file)
    setVideoPreview(previewUrl)

    setMessage('')
  }


  // ================= REMOVE VIDEO =================

  const handleRemoveVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
    }

    setSelectedVideo(null)
    setVideoPreview(null)

    const fileInput = document.getElementById('file')

    if (fileInput) {
      fileInput.value = ''
    }

    setMessage('')
  }


  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')

    const name = e.target.name.value
    const description = e.target.description.value

    // Video validation
    if (!selectedVideo) {
      setMessage('Please select a food video.')
      return
    }

    try {
      setLoading(true)

      // FormData because we are sending a file
      const formData = new FormData()

      formData.append('file', selectedVideo)
      formData.append('name', name)
      formData.append('description', description)

      const response = await axios.post(
        'http://localhost:3000/api/food/',
        formData,
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      setMessage('Food reel created successfully! 🎉')

      // Reset form
      e.target.reset()

      setSelectedVideo(null)

      if (videoPreview) {
        URL.revokeObjectURL(videoPreview)
      }

      setVideoPreview(null)
      // Go to home after successful creation
        setTimeout(() => {
         navigate('/')
        }, 800)


    } catch (err) {

      console.log(err.response?.data || err)

      setMessage(
        err.response?.data?.message ||
        'Something went wrong. Please try again.'
      )

    } finally {
      setLoading(false)
    }
  }


  // ================= CLEANUP =================

  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview)
      }
    }
  }, [videoPreview])


  return (
    <div className="min-h-dvh bg-gray-50 px-4 py-6 text-gray-900 dark:bg-gray-950 dark:text-white">

      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}

        <header className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-xl font-bold">
              TasteLoop
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Food • Reels • Discover
            </p>
          </div>

          <div className="rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            Food Partner
          </div>

        </header>


        {/* ================= MAIN ================= */}

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">


          {/* ================= LEFT ================= */}

          <section className="hidden lg:block lg:pt-10">

            <span className="inline-flex rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              ✨ Grow your food business
            </span>


            <h2 className="mt-5 max-w-lg text-5xl font-extrabold leading-tight">

              Let your food

              <span className="block text-orange-500">
                do the talking.
              </span>

            </h2>


            <p className="mt-5 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              Create delicious food reels and let hungry customers
              discover your best dishes on TasteLoop.
            </p>


            {/* FOOD VISUAL */}

            <div className="mt-8 flex items-center gap-5">

              <div className="flex h-40 w-32 rotate-[-6deg] flex-col items-center justify-center rounded-2xl bg-orange-100 shadow-md dark:bg-gray-800">

                <span className="text-6xl">
                  🍕
                </span>

                <span className="mt-2 text-xs font-semibold">
                  Your Food
                </span>

              </div>


              <div className="flex h-40 w-32 rotate-[6deg] flex-col items-center justify-center rounded-2xl bg-red-100 shadow-md dark:bg-gray-800">

                <span className="text-6xl">
                  🍔
                </span>

                <span className="mt-2 text-xs font-semibold">
                  Your Reel
                </span>

              </div>

            </div>

          </section>



          {/* ================= FORM ================= */}

          <section>

            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-gray-900 sm:p-7">

              {/* FORM HEADER */}

              <div className="mb-6">

                <h2 className="text-2xl font-bold">
                  Create Food Reel
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Add your dish details and upload a video.
                </p>

              </div>


              <form onSubmit={handleSubmit}>


                {/* ================= VIDEO ================= */}

                <div className="mb-6">

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="file"
                      className="text-sm font-semibold"
                    >
                      Food Video
                    </label>

                    <span className="text-xs text-red-500">
                      Required
                    </span>

                  </div>


                  {/* VIDEO PREVIEW */}

                  {videoPreview ? (

                    <div className="relative overflow-hidden rounded-2xl bg-black">

                      <video
                        src={videoPreview}
                        controls
                        className="mx-auto h-72 w-full object-contain sm:h-80"
                      />


                      {/* CHANGE / REMOVE */}

                      <div className="absolute right-3 top-3 flex gap-2">

                        <label
                          htmlFor="file"
                          className="cursor-pointer rounded-lg bg-black/70 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black"
                        >
                          Change
                        </label>


                        <button
                          type="button"
                          onClick={handleRemoveVideo}
                          className="rounded-lg bg-red-500/90 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-red-600"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  ) : (

                    /* UPLOAD BOX */

                    <label
                      htmlFor="file"
                      className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl bg-orange-50 px-5 py-8 text-center transition hover:bg-orange-100 dark:bg-gray-800"
                    >

                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-2xl shadow-lg shadow-orange-500/20">
                        🎥
                      </div>


                      <p className="text-sm font-semibold">
                        Upload your food video
                      </p>


                      <p className="mt-1 max-w-xs text-xs leading-5 text-gray-500 dark:text-gray-400">
                        Select a video to preview it before creating
                        your food reel.
                      </p>


                      <span className="mt-4 rounded-lg bg-gray-900 px-5 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-gray-900">
                        Choose Video
                      </span>

                    </label>

                  )}


                  {/* FILE INPUT */}

                  <input
                    id="file"
                    name="file"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                  />


                  {/* FILE INFO */}

                  {selectedVideo && (

                    <div className="mt-2 flex items-center justify-between gap-3">

                      <p className="min-w-0 truncate text-xs text-gray-500 dark:text-gray-400">
                        {selectedVideo.name}
                      </p>

                      <p className="shrink-0 text-xs text-gray-400">
                        {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
                      </p>

                    </div>

                  )}

                </div>



                {/* ================= FOOD NAME ================= */}

                <div className="mb-5">

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Food Name
                  </label>


                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. Butter Chicken"
                    required
                    className="w-full rounded-xl bg-gray-50 px-4 py-3.5 text-sm outline-none ring-1 ring-transparent transition placeholder:text-gray-400 focus:bg-white focus:ring-orange-500/30 dark:bg-gray-800 dark:placeholder:text-gray-500"
                  />

                </div>



                {/* ================= DESCRIPTION ================= */}

                <div className="mb-6">

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="description"
                      className="text-sm font-semibold"
                    >
                      Description
                    </label>

                    <span className="text-xs text-gray-400">
                      Optional
                    </span>

                  </div>


                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Tell people what makes this dish special..."
                    className="w-full resize-none rounded-xl bg-gray-50 px-4 py-3.5 text-sm outline-none ring-1 ring-transparent transition placeholder:text-gray-400 focus:bg-white focus:ring-orange-500/30 dark:bg-gray-800 dark:placeholder:text-gray-500"
                  />

                </div>



                {/* ================= MESSAGE ================= */}

                {message && (
                  <div className="mb-4 rounded-xl bg-gray-50 px-4 py-3 text-center text-sm dark:bg-gray-800">
                    {message}
                  </div>
                )}



                {/* ================= SUBMIT ================= */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading
                    ? 'Creating Food Reel...'
                    : 'Create Food Reel →'
                  }

                </button>


              </form>

            </div>

          </section>

        </div>

      </div>

    </div>
  )
}

export default CreateFood