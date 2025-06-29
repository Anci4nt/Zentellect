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
    <div className="min-h-screen px-6 py-8 bg-white  text-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
      

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto mb-8 h-[300px] p-4 bg-gray-300  rounded-xl space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
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
  className="space-y-4"
>
  <input
    type="text"
    placeholder="Enter topic"
    value={topic}
    onChange={(e) => setTopic(e.target.value)}
    className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-400 text-black dark:text-white"
  />

  <textarea
    placeholder="Paste your notes"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
    className="w-full h-32 p-3 rounded-lg bg-gray-200 dark:bg-gray-400 text-black dark:text-white resize-none"
  />

  <button
    type="submit"
    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
  >
    Submit to AI
  </button>
</form>

      </div>
    
  )
}
