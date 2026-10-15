
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import FoodReel from '../../components/FoodReel'

const Home = () => {
  const [foodVideos, setFoodVideos] = useState([])
  const [likedFoods, setLikedFoods] = useState([])
  const [savedFoods, setSavedFoods] = useState([])
  const [loadingActions, setLoadingActions] = useState({})
  const [notice, setNotice] = useState('')

  // Fetch food items
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await api.get('/api/food/')

        setFoodVideos(response.data.foodItems || [])
      } catch (err) {
        console.error('Error fetching food items:', err)
      }
    }

    fetchFoodItems()
  }, [])

  // Fetch user's likes and saves
  useEffect(() => {
    const fetchUserActions = async () => {
      try {
        const likesResponse = await api.get('/api/food/my-likes')

        const savesResponse = await api.get('/api/food/my-saves')

        setLikedFoods(likesResponse.data.likedFoods || [])
        setSavedFoods(savesResponse.data.savedFoods || [])
      } catch (err) {
        console.error('Error fetching likes and saves:', err)
      }
    }

    fetchUserActions()
  }, [])

  // Show feedback message
  const showNotice = (message) => {
    setNotice(message)
    setTimeout(() => setNotice(''), 2000)
  }

  // Like / Unlike
  const handleLike = async (food) => {
    const foodId = food._id
    const actionKey = `like-${foodId}`

    if (loadingActions[actionKey]) return

    const wasLiked = likedFoods.includes(foodId)

    setLoadingActions((prev) => ({
      ...prev,
      [actionKey]: true
    }))

    try {
      await api.post('/api/food/like', { foodId })

      setLikedFoods((prev) =>
        wasLiked
          ? prev.filter((id) => id !== foodId)
          : [...prev, foodId]
      )

      setFoodVideos((prev) =>
        prev.map((item) =>
          item._id === foodId
            ? {
                ...item,
                likeCount: Math.max(
                  0,
                  (item.likeCount || 0) + (wasLiked ? -1 : 1)
                )
              }
            : item
        )
      )
    } catch (err) {
      console.error('Error updating like:', err)
      showNotice(err.response?.data?.message || 'Could not update like.')
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        [actionKey]: false
      }))
    }
  }

  // Save / Unsave
  const handleSave = async (foodId) => {
    const actionKey = `save-${foodId}`

    if (loadingActions[actionKey]) return

    const wasSaved = savedFoods.includes(foodId)

    setLoadingActions((prev) => ({
      ...prev,
      [actionKey]: true
    }))

    try {
      await api.post('/api/food/save', { foodId })

      setSavedFoods((prev) =>
        wasSaved
          ? prev.filter((id) => id !== foodId)
          : [...prev, foodId]
      )

      showNotice(wasSaved ? 'Removed from saved' : 'Food saved')
    } catch (err) {
      console.error('Error saving food:', err)
      showNotice(err.response?.data?.message || 'Could not save food.')
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        [actionKey]: false
      }))
    }
  }

  const handleComment = () => {
    showNotice('Comments feature is coming soon!')
  }

  return (
    <main className="flex h-dvh w-full items-center justify-center overflow-hidden bg-black text-white sm:px-4 sm:py-3 lg:px-6">

      {/* Reels frame */}
      <div className="relative h-dvh w-full overflow-hidden bg-black sm:h-[92dvh] sm:max-h-[850px] sm:max-w-[460px] sm:rounded-3xl sm:border sm:border-white/10 sm:shadow-2xl">

        {/* Header */}
        <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-4 pb-8 pt-4 sm:px-5">
          <span className="ml-auto text-right text-xs font-medium text-white/80">
            Discover food
          </span>
        </header>

        {/* Scrollable reels */}
        <div className="absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-y-contain snap-y snap-mandatory touch-pan-y [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {foodVideos.length > 0 ? (
            foodVideos.map((food) => (
              <section
                key={food._id}
                className="h-full min-h-full w-full shrink-0 snap-start snap-always"
              >
                <FoodReel
                  food={food}
                  isLiked={likedFoods.includes(food._id)}
                  isSaved={savedFoods.includes(food._id)}
                  likeLoading={!!loadingActions[`like-${food._id}`]}
                  saveLoading={!!loadingActions[`save-${food._id}`]}
                  onLike={handleLike}
                  onSave={handleSave}
                  onComment={handleComment}
                />
              </section>
            ))
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-8 text-center">
              <h2 className="text-lg font-semibold">
                No food reels yet
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Food videos will appear here when they are available.
              </p>
            </div>
          )}
        </div>

        {/* Feedback */}
        {notice && (
          <div
            role="status"
            className="absolute bottom-5 left-1/2 z-40 w-max max-w-[85%] -translate-x-1/2 rounded-full bg-white px-4 py-2.5 text-center text-sm font-medium text-black shadow-lg"
          >
            {notice}
          </div>
        )}
      </div>
    </main>
  )
}

export default Home
