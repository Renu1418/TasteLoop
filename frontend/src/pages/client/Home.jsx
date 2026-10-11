
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FoodReel from '../../components/FoodReel'
import BottomNav from '../../components/BottomNav'

const API = 'http://localhost:3000/api/food'

const Home = () => {
  const [foodVideos, setFoodVideos] = useState([])
  const [likedFoods, setLikedFoods] = useState([])
  const [savedFoods, setSavedFoods] = useState([])
  const [loadingActions, setLoadingActions] = useState({})
  const [activeTab, setActiveTab] = useState('home')
  const [notice, setNotice] = useState('')

  // Fetch food items
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`${API}/`, {
          withCredentials: true
        })

        setFoodVideos(response.data.foodItems || [])
      } catch (err) {
        console.log(err.response?.data || err)
      }
    }

    fetchFoodItems()
  }, []);


  
useEffect(() => {
  const fetchUserActions = async () => {
    try {
      const likesResponse = await axios.get(`${API}/my-likes`, {
        withCredentials: true
      })

      const savesResponse = await axios.get(`${API}/my-saves`, {
        withCredentials: true
      })

      setLikedFoods(likesResponse.data.likedFoods || [])
      setSavedFoods(savesResponse.data.savedFoods || [])

    } catch (err) {
      console.log(err.response?.data || err)
    }
  }

  fetchUserActions()
}, [])

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
      await axios.post(
        `${API}/like`,
        { foodId },
        { withCredentials: true }
      )

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
      console.log(err.response?.data || err)
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
      await axios.post(
        `${API}/save`,
        { foodId },
        { withCredentials: true }
      )

      setSavedFoods((prev) =>
        wasSaved
          ? prev.filter((id) => id !== foodId)
          : [...prev, foodId]
      )

      showNotice(wasSaved ? 'Removed from saved' : 'Food saved')
    } catch (err) {
      console.log(err.response?.data || err)
      showNotice(err.response?.data?.message || 'Could not save food.')
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        [actionKey]: false
      }))
    }
  }

  // Small feedback message
  const showNotice = (message) => {
    setNotice(message)
    setTimeout(() => setNotice(''), 2000)
  }

  const handleComment = () => {
    showNotice('Comments feature is coming soon!')
  }

  const visibleFoods =
    activeTab === 'saved'
      ? foodVideos.filter((food) => savedFoods.includes(food._id))
      : foodVideos

  return (
    <main className="flex h-dvh w-full items-center justify-center overflow-hidden bg-black text-white sm:px-4 sm:py-3 lg:px-6">

      {/* Responsive app frame */}
      <div className="relative h-dvh w-full overflow-hidden bg-black sm:h-[92dvh] sm:max-h-[850px] sm:max-w-[460px] sm:rounded-3xl sm:border sm:border-white/10 sm:shadow-2xl">

        {/* Header */}
        <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-4 pb-8 pt-4 sm:px-5">
          <h1 className="text-xl font-extrabold tracking-tight">
            Taste<span className="text-orange-400">Loop</span>
          </h1>

          <span className="text-xs font-medium text-white/80">
            {activeTab === 'home' ? 'Discover food' : 'Your collection'}
          </span>
        </header>

        {/* Scrollable reels area */}
        <div
          key={activeTab}
          className="absolute inset-x-0 top-0 bottom-[68px] overflow-x-hidden overflow-y-auto overscroll-y-contain snap-y snap-mandatory touch-pan-y [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visibleFoods.length > 0 ? (
            visibleFoods.map((food) => (
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
            <div className="flex h-full min-h-full flex-col items-center justify-center px-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-8 w-8 text-zinc-400"
                >
                  <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z" />
                </svg>
              </div>

              <h2 className="text-lg font-semibold">
                {activeTab === 'saved'
                  ? 'No saved food yet'
                  : 'No food reels yet'}
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {activeTab === 'saved'
                  ? 'Tap the bookmark on a reel to save your favourite food.'
                  : 'Food videos will appear here when they are available.'}
              </p>

              {activeTab === 'saved' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className="mt-5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black"
                >
                  Explore food
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bottom navigation */}
        <BottomNav
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Feedback */}
        {notice && (
          <div
            role="status"
            className="absolute bottom-20 left-1/2 z-40 w-max max-w-[85%] -translate-x-1/2 rounded-full bg-white px-4 py-2.5 text-center text-sm font-medium text-black shadow-lg"
          >
            {notice}
          </div>
        )}
      </div>
    </main>
  )
}

export default Home