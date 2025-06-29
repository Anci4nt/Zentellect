'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import GoalSelector from './GoalSelector'
import Stats from './Stats'

export default function Timer() {
  const [goal, setGoal] = useState(25)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const { isDark } = useTheme()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    } else if (isRunning && timeLeft === 0) {
      endSession()
      setIsRunning(false)
    }
    return () => clearTimeout(timer)
  }, [timeLeft, isRunning])

  const format = (sec: number) =>
    `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`

  const startTimer = async () => {
    if (!hasStarted) {
      setTimeLeft(goal * 60)
      setHasStarted(true)
      setIsRunning(true)

      // ✅ Create a session in DB
      const res = await fetch('/api/sessions', {
        method: 'POST',
        body: JSON.stringify({ startedAt: new Date().toISOString() }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      setSessionId(data.session.id)
    } else {
      setIsRunning(true)
    }
  }

  const endSession = async () => {
    if (sessionId) {
      await fetch(`/api/sessions/${sessionId}`, {
        method: 'PATCH',
        body: JSON.stringify({ endedAt: new Date().toISOString() }),
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  const stopTimer = () => {
    setIsRunning(false)
    endSession()
  }

  const resetTimer = () => {
    setTimeLeft(0)
    setIsRunning(false)
    setHasStarted(false)
    setSessionId(null)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className={`rounded-xl p-6 shadow-sm flex flex-col items-center justify-center transition-colors duration-300 ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="text-5xl font-bold mb-2">{format(timeLeft)}</div>
        <div className={`mb-6 transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Goal: {goal} min
        </div>
        <div className="flex gap-4">
          <button
            onClick={startTimer}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition-colors duration-200"
          >
            Start
          </button>
          <button
            onClick={stopTimer}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded shadow transition-colors duration-200"
          >
            Stop
          </button>
          <button
            onClick={resetTimer}
            className={`px-4 py-2 rounded shadow transition-colors duration-200 ${
              isDark 
                ? 'bg-gray-600 hover:bg-gray-700 text-gray-200' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <GoalSelector goal={goal} setGoal={setGoal} />
        <Stats />
      </div>
    </div>
  )
}