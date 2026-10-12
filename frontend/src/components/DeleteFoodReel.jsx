
import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:3000/api/food'

const DeleteFoodReel = ({ foodId, onDeleted, compact = false }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this food reel?'
    )

    if (!confirmed || loading) return

    try {
      setLoading(true)

      const response = await axios.delete(`${API}/${foodId}`, {
        withCredentials: true
      })

      if (response.data.success) {
        onDeleted(foodId)
      }
    } catch (error) {
      console.error(
        'Delete reel error:',
        error.response?.data || error
      )

      alert(
        error.response?.data?.message ||
        'Unable to delete this reel. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className={
        compact
          ? 'rounded-lg border border-red-400/30 bg-red-600/85 px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50'
          : 'rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50'
      }
    >
      {loading ? 'Deleting...' : 'Delete Reel'}
    </button>
  )
}

export default DeleteFoodReel
