'use client'

import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'AI Chat', href: '#' },
  { label: 'Subjects', href: '#' },
  { label: 'Study Timer', href: '#', active: true },
  { label: 'Notes', href: '#' },
]

export default function Header() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="max-w-6xl mx-auto mt-10 px-6">
      <div className="bg-white shadow-md rounded-[2rem] py-4 px-6 flex flex-col md:flex-row items-center justify-between transition-all duration-700 ease-out">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="w-10 h-10 bg-green-800 text-white rounded-lg flex items-center justify-center text-lg font-bold">
            🧠
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">StudyAI</h1>
            <p className="text-xs text-gray-500 -mt-1">Your learning companion</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-opacity duration-700 ease-out transform ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              } delay-[${i * 100}ms] ${
                link.active
                  ? 'text-orange-600 border-b-2 border-orange-500 pb-1'
                  : 'hover:text-green-700'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Online Badge */}
        <div className="hidden md:block ml-6 text-green-600 font-semibold text-sm">
          ● Online
        </div>
      </div>
    </div>
  )
}
