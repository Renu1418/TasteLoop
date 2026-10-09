
import React from 'react'
import { Link } from 'react-router-dom'

const FoodReel = ({
  food,
  isLiked,
  isSaved,
  likeLoading,
  saveLoading,
  onLike,
  onSave,
  onComment
}) => {
  return (
    <article className="relative h-full w-full shrink-0 snap-start snap-always overflow-hidden bg-zinc-900 sm:rounded-2xl">
      {/* Video */}
      <video
        src={food.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

      {/* Food details */}
      <div className="absolute bottom-0 left-0 z-10 w-[78%] p-4 pb-6 text-white sm:p-6 sm:pb-7">
        <h2 className="mb-2 text-lg font-bold drop-shadow-lg sm:text-xl">
          {food.name}
        </h2>

        <p className="mb-4 line-clamp-2 text-sm leading-5 text-white/90 sm:text-base">
          {food.description || 'Discover this delicious food!'}
        </p>

        <Link
          to={`/food-partner/${food.foodPartner}`}
          className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/15 px-5 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-white hover:text-black"
        >
          Visit Store <span>↗</span>
        </Link>
      </div>

      {/* Instagram-style action buttons */}
      <div className="absolute bottom-24 right-2 z-10 flex flex-col items-center gap-4 sm:bottom-28 sm:right-4 sm:gap-6">
        {/* Like */}
        <button
          type="button"
          onClick={() => onLike(food)}
          disabled={likeLoading}
          aria-label={isLiked ? 'Unlike food' : 'Like food'}
          aria-pressed={isLiked}
          className="group flex flex-col items-center gap-1 text-white disabled:opacity-50"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm sm:h-12 sm:w-12">
            <svg
              viewBox="0 0 24 24"
              fill={isLiked ? '#ff3040' : 'none'}
              stroke={isLiked ? '#ff3040' : 'white'}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-7 w-7 transition-transform duration-200 group-active:scale-75 sm:h-8 sm:w-8 ${
                isLiked ? 'scale-110' : 'group-hover:scale-110'
              }`}
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
            </svg>
          </span>

          <span className="text-xs font-semibold drop-shadow">
            {food.likeCount || 0}
          </span>
          <span className="text-[10px] text-white/80">Likes</span>
        </button>

        {/* Save */}
        <button
          type="button"
          onClick={() => onSave(food._id)}
          disabled={saveLoading}
          aria-label={isSaved ? 'Unsave food' : 'Save food'}
          aria-pressed={isSaved}
          className="group flex flex-col items-center gap-1 text-white disabled:opacity-50"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm sm:h-12 sm:w-12">
            <svg
              viewBox="0 0 24 24"
              fill={isSaved ? 'white' : 'none'}
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7 transition-transform duration-200 group-active:scale-75 group-hover:scale-110 sm:h-8 sm:w-8"
            >
              <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z" />
            </svg>
          </span>

          <span className="text-xs font-semibold drop-shadow">
            {isSaved ? 'Saved' : 'Save'}
          </span>
        </button>

        {/* Comment */}
        <button
          type="button"
          onClick={() => onComment(food)}
          aria-label="Comments"
          className="group flex flex-col items-center gap-1 text-white"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm sm:h-12 sm:w-12">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7 transition-transform group-hover:scale-110 sm:h-8 sm:w-8"
            >
              <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
            </svg>
          </span>

          <span className="text-[10px] font-semibold drop-shadow sm:text-xs">
            Comment
          </span>
        </button>
      </div>
    </article>
  )
}

export default FoodReel