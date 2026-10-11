import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import FoodReel from '../../components/FoodReel'

const API = 'http://localhost:3000/api/food'

const Profile = () => {
  const { id } = useParams()

  const [profile, setProfile] = useState(null)
  const [foodVideos, setFoodVideos] = useState([])
  const [likedFoods, setLikedFoods] = useState([])
  const [savedFoods, setSavedFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [actions, setActions] = useState({})
  const [notice, setNotice] = useState('')

  const viewerHistory = useRef(false)
  const noticeTimer = useRef(null)

  useEffect(() => {
    let active = true

    const fetchProfile = async () => {
      setLoading(true)
      setError('')

      try {
        const [profileRes, likesRes, savesRes] = await Promise.all([
          axios.get(`${API}/food-partner/${id}`, {
            withCredentials: true,
          }),
          axios.get(`${API}/my-likes`, {
            withCredentials: true,
          }),
          axios.get(`${API}/my-saves`, {
            withCredentials: true,
          }),
        ])

        if (!active) return

        setProfile(profileRes.data.foodPartner)
        setFoodVideos(profileRes.data.foodItems || [])
        setLikedFoods(likesRes.data.likedFoods || [])
        setSavedFoods(savesRes.data.savedFoods || [])
      } catch (err) {
        console.error(err.response?.data || err)
        if (active) setError('Unable to load this food partner.')
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchProfile()

    return () => {
      active = false
    }
  }, [id])

  useEffect(() => {
    const handlePopState = () => {
      if (viewerHistory.current) {
        viewerHistory.current = false
        setSelectedIndex(null)
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeViewer()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex])

  useEffect(() => {
    return () => {
      if (noticeTimer.current) {
        window.clearTimeout(noticeTimer.current)
      }
    }
  }, [])

  const showNotice = (message) => {
    setNotice(message)

    if (noticeTimer.current) {
      window.clearTimeout(noticeTimer.current)
    }

    noticeTimer.current = window.setTimeout(() => {
      setNotice('')
    }, 2500)
  }

  const openViewer = (index) => {
    window.history.pushState({ foodReelViewer: true }, '')
    viewerHistory.current = true
    setSelectedIndex(index)
  }

  const closeViewer = () => {
    if (viewerHistory.current) {
      window.history.back()
    } else {
      setSelectedIndex(null)
    }
  }

  const isLiked = (foodId) =>
    likedFoods.some((item) => (item._id || item) === foodId)

  const isSaved = (foodId) =>
    savedFoods.some((item) => (item._id || item) === foodId)

  const handleLike = async (food) => {
    const foodId = food._id
    const key = `like-${foodId}`

    if (actions[key]) return

    const wasLiked = isLiked(foodId)

    setActions((prev) => ({ ...prev, [key]: true }))

    try {
      await axios.post(
        `${API}/like`,
        { foodId },
        { withCredentials: true }
      )

      setLikedFoods((prev) =>
        wasLiked
          ? prev.filter((item) => (item._id || item) !== foodId)
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
              ),
            }
            : item
        )
      )

      showNotice(wasLiked ? 'Like removed' : 'Food liked!')
    } catch (err) {
      console.error(err.response?.data || err)
      showNotice('Unable to update like.')
    } finally {
      setActions((prev) => ({ ...prev, [key]: false }))
    }
  }

  const handleSave = async (foodId) => {
    const key = `save-${foodId}`

    if (actions[key]) return

    const wasSaved = isSaved(foodId)

    setActions((prev) => ({ ...prev, [key]: true }))

    try {
      await axios.post(
        `${API}/save`,
        { foodId },
        { withCredentials: true }
      )

      setSavedFoods((prev) =>
        wasSaved
          ? prev.filter((item) => (item._id || item) !== foodId)
          : [...prev, foodId]
      )

      showNotice(wasSaved ? 'Removed from Saved' : 'Food saved!')
    } catch (err) {
      console.error(err.response?.data || err)
      showNotice('Unable to update saved food.')
    } finally {
      setActions((prev) => ({ ...prev, [key]: false }))
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#090909] text-zinc-300">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-zinc-800 border-t-orange-500" />
          <p className="text-xs text-zinc-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#090909] px-5 text-center text-zinc-300">
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">
          <p className="text-2xl">🍽️</p>
          <p className="mt-3 text-sm font-semibold">
            {error || 'Food partner not found'}
          </p>
        </div>
      </div>
    )
  }

  const selectedFood =
    selectedIndex === null ? null : foodVideos[selectedIndex]

  return (
    <div className="min-h-dvh overflow-x-clip bg-[#090909] text-white">
      <main className="mx-auto min-h-dvh w-full max-w-3xl px-3 sm:px-5">

        {/* Small header */}
        <header className="flex items-center justify-between border-b border-white/[0.08] py-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-sm">
              🍴
            </div>
            <p className="text-sm font-extrabold">
              Taste<span className="text-orange-400">Loop</span>
            </p>
          </div>

          <span className="rounded-full border border-orange-400/20 px-2 py-1 text-[9px] font-semibold text-orange-300">
            FOOD PARTNER
          </span>
        </header>

        {/* Smaller business profile */}

        <section className="mt-2.5 rounded-xl border border-white/[0.09] bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#111111] p-3.5">
          <div className="flex items-center gap-3.5">
            {/* Business avatar */}
            <div className="shrink-0 rounded-full bg-gradient-to-br from-orange-400 via-amber-500 to-orange-800 p-[2px]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#171717]">
                <span className="text-2xl font-bold text-orange-400">
                  {profile.businessName?.charAt(0)?.toUpperCase() || 'F'}
                </span>
              </div>
            </div>

            {/* Business details */}
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-orange-400">
                  Food Partner
                </p>
              </div>

              <h1 className="break-words text-base font-bold leading-snug text-white sm:text-lg">
                {profile.businessName || 'Food Partner'}
              </h1>

              {profile.address && (
                <p className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-4 text-zinc-400 sm:text-xs">
                  <span className="mt-px shrink-0">📍</span>
                  <span className="break-words">{profile.address}</span>
                </p>
              )}
            </div>
          </div>
        </section>



        {/* Reels grid */}
        <section className="pb-6 pt-3">
          <div className="mb-2.5 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-1.5 text-sm font-bold">
                <span className="h-4 w-1 rounded-full bg-orange-500" />
                Food & Reels
              </h2>
              <p className="mt-0.5 pl-2.5 text-[10px] text-zinc-500">
                Discover something delicious
              </p>
            </div>

            <span className="rounded-md border border-white/[0.08] bg-zinc-900 px-2 py-1 text-[9px] text-zinc-400">
              {foodVideos.length} reels
            </span>
          </div>

          {foodVideos.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 px-4 py-7 text-center">
              <p className="text-xl">🍜</p>
              <p className="mt-2 text-sm font-semibold text-zinc-300">
                No food reels yet
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                New food reels will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
              {foodVideos.map((food, index) => (
                <FoodReel
                  key={food._id}
                  food={food}
                  variant="grid"
                  onOpen={() => openViewer(index)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Full-screen reel viewer */}
      {selectedFood && (
        <div className="fixed inset-0 z-[100] bg-black text-white">
          <header className="absolute left-0 right-0 top-0 z-20 flex items-center gap-3 bg-gradient-to-b from-black/80 to-transparent px-4 py-4">
            <button
              type="button"
              onClick={closeViewer}
              aria-label="Back to profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-2xl transition hover:bg-white/15"
            >
              ←
            </button>

            <div>
              <h2 className="text-sm font-bold">Food Reels</h2>
              <p className="text-xs text-zinc-400">
                {selectedIndex + 1} of {foodVideos.length}
              </p>
            </div>
          </header>

          <div className="flex h-full items-center justify-center">
            <div className="h-full w-full max-w-[460px] overflow-hidden sm:h-[94dvh]">
              <FoodReel
                key={selectedFood._id}
                food={selectedFood}
                isLiked={isLiked(selectedFood._id)}
                isSaved={isSaved(selectedFood._id)}
                likeLoading={!!actions[`like-${selectedFood._id}`]}
                saveLoading={!!actions[`save-${selectedFood._id}`]}
                onLike={handleLike}
                onSave={handleSave}
                onComment={() =>
                  showNotice('Comments feature is coming soon!')
                }
              />
            </div>
          </div>

          {notice && (
            <div
              role="status"
              className="absolute bottom-6 left-1/2 z-30 max-w-[90vw] -translate-x-1/2 rounded-full border border-white/10 bg-white px-4 py-2.5 text-center text-sm font-medium text-black shadow-xl"
            >
              {notice}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Profile
