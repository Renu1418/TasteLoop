import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {

  const [foodVideos, setFoodVideos] = useState([])

  const videoRefs = useRef(new Map())
  const containerRef = useRef(null)

  const setVideoRef = (id) => (element) => {
    if (!element) {
      videoRefs.current.delete(id)
      return
    }

    videoRefs.current.set(id, element)
  }

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/food/',
        { withCredentials: true }
      )

      console.log(response.data)
      setFoodVideos(response.data.foodItems)

    } catch (err) {
      console.log(err.response?.data || err)
    }
  }

  useEffect(() => {
    fetchFoodItems()
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black"
    >

      {foodVideos.map((food) => (

        <section
          key={food._id}
          className="relative h-screen w-full snap-start snap-always"
        >

          {/* Video */}
          <video
            ref={setVideoRef(food._id)}
            src={food.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 w-full p-5 text-white">

            {/* Description */}
            <p className="mb-3 line-clamp-2 max-w-xl text-sm leading-5">
              {food.description}
            </p>

            {/* Visit Store */}
            <Link
              to={"/food-partner/" + food.foodPartner}
              className="inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200"
            >
              Visit Store
            </Link>

          </div>

        </section>

      ))}

    </div>
  )
}

export default Home