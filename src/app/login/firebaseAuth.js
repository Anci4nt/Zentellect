'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function EmailLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('User logged in:', userCredential.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={login}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Email Login</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
