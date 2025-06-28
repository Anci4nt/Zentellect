'use client'

import { useEffect, useState } from 'react'

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
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">🏆 Study Stats</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Sessions Completed Today</span>
          <span>{stats.totalSessions}</span>
        </div>
        <div className="flex justify-between">
          <span>Current Session</span>
          <span>{formatTime(stats.currentDuration)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Study Time Today</span>
          <span>{formatTime(stats.totalTime)}</span>
        </div>
      </div>
    </div>
  )
}
