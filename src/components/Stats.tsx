'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

export default function Stats() {
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalTime: 0,
    currentDuration: 0,
  })
  const { isDark } = useTheme()

  const fetchStats = async () => {
    const res = await fetch('/api/stats')
    const data = await res.json()
    setStats(data)
  }

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`rounded-xl p-4 sm:p-6 shadow-sm transition-colors duration-300 ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h3 className="font-semibold text-base sm:text-lg mb-4">🏆 Study Stats</h3>

      <div className="space-y-3 text-sm sm:text-base">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            Sessions Completed Today
          </span>
          <span className="font-medium text-end sm:text-left">{stats.totalSessions}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Current Session</span>
          <span className="font-medium text-end sm:text-left">
            {formatTime(stats.currentDuration)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            Total Study Time Today
          </span>
          <span className="font-medium text-end sm:text-left">{formatTime(stats.totalTime)}</span>
        </div>
      </div>
    </div>
  )
}
