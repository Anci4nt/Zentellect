'use client'

import { useState } from 'react'

export default function Chatbot() {
  const [messages, setMessages] = useState([])
  const [topic, setTopic] = useState('')
  const [notes, setNotes] = useState('')

  const handleSend = async () => {
  if (!topic.trim() || !notes.trim()) return

  setMessages((prev) => [
    ...prev,
    { role: 'user', content: `Topic: ${topic}\nNotes: ${notes}` },
  ])

  setTopic('')
  setNotes('')

  try {
    const res = await fetch('api/ask/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, notes }),
    })

    const data = await res.json()

    setMessages((prev) => [
      ...prev,
      { role: 'bot', content: data.reply || '⚠️ No response' },
    ])
  } catch (err) {
    console.error(err)
    setMessages((prev) => [
      ...prev,
      { role: 'bot', content: '⚠️ Error connecting to AI' },
    ])
  }
}


  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto mb-10 h-[300px] p-5 bg-white dark:bg-gray-800 rounded-2xl space-y-4 border border-gray-200 dark:border-gray-700 shadow">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-sm px-4 py-2 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT AREA AT BOTTOM */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSend()
        }}
        className="space-y-4 max-w-xl mx-auto w-full"
      >
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Paste your notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-32 p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition shadow-md"
          >
            Submit to AI
          </button>
        </div>
      </form>
    </div>
  )
}
