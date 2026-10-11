import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FoodReel from './FoodReel'

const API = 'http://localhost:3000/api/food'

const FoodCollection = ({ type }) => {
    const [foodVideos, setFoodVideos] = useState([])
    const [likedFoods, setLikedFoods] = useState([])
    const [savedFoods, setSavedFoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingActions, setLoadingActions] = useState({})
    const [notice, setNotice] = useState('')
    const [error, setError] = useState('')

    // Hide outer scrollbar only on Saved/Liked pages
    useEffect(() => {
        const previousHtmlOverflow =
            document.documentElement.style.overflow
        const previousBodyOverflow =
            document.body.style.overflow

        document.documentElement.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'

        return () => {
            document.documentElement.style.overflow =
                previousHtmlOverflow
            document.body.style.overflow =
                previousBodyOverflow
        }
    }, [])

    // Fetch food, likes and saves
    useEffect(() => {
        const fetchCollection = async () => {
            try {
                setLoading(true)
                setError('')

                const [foodResponse, likesResponse, savesResponse] =
                    await Promise.all([
                        axios.get(`${API}/`, { withCredentials: true }),
                        axios.get(`${API}/my-likes`, { withCredentials: true }),
                        axios.get(`${API}/my-saves`, { withCredentials: true }),
                    ])

                setFoodVideos(foodResponse.data.foodItems || [])
                setLikedFoods(likesResponse.data.likedFoods || [])
                setSavedFoods(savesResponse.data.savedFoods || [])
            } catch (err) {
                console.error('Error fetching food collection:', err)
                setError('Unable to load food. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchCollection()
    }, [])

    const showNotice = (message) => {
        setNotice(message)
        setTimeout(() => setNotice(''), 2500)
    }

    // Like / Unlike
    const handleLike = async (food) => {
        const foodId = food._id
        const actionKey = `like-${foodId}`

        if (loadingActions[actionKey]) return

        const wasLiked = likedFoods.includes(foodId)

        try {
            setLoadingActions((prev) => ({
                ...prev,
                [actionKey]: true,
            }))

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
                            ),
                        }
                        : item
                )
            )

            showNotice(wasLiked ? 'Like removed' : 'Food liked!')
        } catch (err) {
            console.error('Error liking food:', err)
            showNotice('Unable to update like. Please try again.')
        } finally {
            setLoadingActions((prev) => ({
                ...prev,
                [actionKey]: false,
            }))
        }
    }

    // Save / Unsave
    const handleSave = async (foodId) => {
        const actionKey = `save-${foodId}`

        if (loadingActions[actionKey]) return

        const wasSaved = savedFoods.includes(foodId)

        try {
            setLoadingActions((prev) => ({
                ...prev,
                [actionKey]: true,
            }))

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

            showNotice(wasSaved ? 'Removed from Saved' : 'Food saved!')
        } catch (err) {
            console.error('Error saving food:', err)
            showNotice('Unable to update saved food. Please try again.')
        } finally {
            setLoadingActions((prev) => ({
                ...prev,
                [actionKey]: false,
            }))
        }
    }

    const visibleFoods = foodVideos.filter((food) =>
        type === 'liked'
            ? likedFoods.includes(food._id)
            : savedFoods.includes(food._id)
    )

    const title = type === 'liked' ? 'Liked Reels' : 'Saved Reels'

    if (loading) {
        return (
            <div className="flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-black text-white">
                Loading {title}...
            </div>
        )
    }

    return (
        <div className="flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-black px-3 py-3 text-white sm:px-5 sm:py-4">
            {/* Reels frame: spacing without a visible border */}
            <main className="relative flex h-full w-full max-w-[460px] flex-col overflow-hidden rounded-2xl bg-black sm:rounded-3xl">

                {/* Header */}
                <header className="z-20 flex shrink-0 items-center justify-between border-b border-white/10 bg-black px-4 py-4">
                    <h1 className="text-xl font-bold text-zinc-200">
                        {title}
                    </h1>

                    <span className="text-sm text-zinc-400">
                        {visibleFoods.length} reels
                    </span>
                </header>

                {/* Error state */}
                {error ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                        <p className="text-red-400">{error}</p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white"
                        >
                            Try Again
                        </button>
                    </div>
                ) : visibleFoods.length === 0 ? (
                    /* Empty state */
                    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                        <p className="mb-2 text-lg font-semibold">
                            {type === 'liked'
                                ? 'No liked reels yet'
                                : 'No saved reels yet'}
                        </p>
                        <p className="text-sm text-zinc-400">
                            {type === 'liked'
                                ? 'Like the food reels you enjoy to find them here.'
                                : 'Save your favourite food reels to watch them later.'}
                        </p>
                    </div>
                ) : (
                    /* Reels: scrolling works, scrollbar stays hidden */
                    <div className="min-h-0 flex-1 snap-y snap-mandatory overflow-x-hidden overflow-y-auto overscroll-y-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {visibleFoods.map((food) => (
                            <div
                                key={food._id}
                                className="h-full min-h-full snap-start snap-always"
                            >
                                <FoodReel
                                    food={food}
                                    isLiked={likedFoods.includes(food._id)}
                                    isSaved={savedFoods.includes(food._id)}
                                    likeLoading={!!loadingActions[`like-${food._id}`]}
                                    saveLoading={!!loadingActions[`save-${food._id}`]}
                                    onLike={handleLike}
                                    onSave={handleSave}
                                    onComment={() =>
                                        showNotice('Comments feature is coming soon!')
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Notification */}
                {notice && (
                    <div
                        role="status"
                        className="absolute bottom-6 left-1/2 z-30 w-max max-w-[85%] -translate-x-1/2 rounded-full bg-white px-4 py-2 text-center text-sm font-medium text-black shadow-lg"
                    >
                        {notice}
                    </div>
                )}
            </main>
        </div>
    )
}

export default FoodCollection