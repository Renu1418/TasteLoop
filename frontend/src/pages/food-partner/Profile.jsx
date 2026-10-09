import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
  const { id } = useParams()

  const [profile, setProfile] = useState(null)
  const [foodVideos, setFoodVideos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFoodPartner = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/food/food-partner/${id}`,
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      setProfile(response.data.foodPartner)
      setFoodVideos(response.data.foodItems)

    } catch (err) {
      console.log(err.response?.data || err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFoodPartner()
  }, [id])


  // Loading
  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </p>
      </div>
    )
  }


  // Food partner not found
  if (!profile) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Food partner not found
        </p>
      </div>
    )
  }


  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">

      {/* Main Container */}
      <div className="mx-auto min-h-dvh w-full max-w-lg bg-white shadow-sm dark:bg-gray-900">


        {/* ================= PROFILE HEADER ================= */}

        <div className="px-5 pb-6 pt-8 sm:px-7">


          {/* Profile Info */}
          <div className="flex items-center gap-5">


            {/* Profile Image */}
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 sm:h-28 sm:w-28">

              <img
                src="https://via.placeholder.com/100"
                alt={profile.businessName}
                className="h-full w-full object-cover"
              />

            </div>


            {/* Business Info */}
            <div className="min-w-0 flex-1">

              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {profile.businessName}
              </h1>

              <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">

                <span>📍</span>

                <span className="truncate">
                  {profile.address}
                </span>

              </p>

            </div>

          </div>


          {/* ================= STATS ================= */}

          <div className="mt-8 grid grid-cols-2 border-y border-gray-100 py-5 dark:border-gray-800">


            {/* Total Meals */}
            <div className="text-center">

              <p className="text-xl font-semibold">
                {foodVideos.length}
              </p>

              <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Meals
              </p>

            </div>


            {/* Customer Served */}
            <div className="border-l border-gray-100 text-center dark:border-gray-800">

              <p className="text-xl font-semibold">
                15K
              </p>

              <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                Customers Served
              </p>

            </div>

          </div>

        </div>


        {/* ================= FOOD VIDEOS ================= */}

        <div className="px-1 pb-8 sm:px-2">

          <div className="mb-3 px-2">

            <h2 className="text-sm font-semibold">
              Food & Reels
            </h2>

            <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
              Explore our delicious meals
            </p>

          </div>


          {/* Video Grid */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">

            {foodVideos.map((food) => (

              <div
                key={food._id}
                className="group aspect-square overflow-hidden rounded-sm bg-gray-100 dark:bg-gray-800"
              >

                <video
                  src={food.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

              </div>

            ))}

          </div>

        </div>


        {/* Bottom Spacing */}
        <div className="h-8" />

      </div>

    </div>
  )
}

export default Profile