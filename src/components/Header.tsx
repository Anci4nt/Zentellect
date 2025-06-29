'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
const navLinks = [
  { label: 'AI Chat', href: '/chat', active: false},
  { label: 'Study Timer', href: '/', active: false },
  { label: 'Notes', href: '/note', active: false },
]

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname();
  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-700 ease-out">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-800 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-sm">
            🧠
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">StudyAI</h1>
            <p className="text-xs text-gray-500 -mt-1">Your learning companion</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex gap-4 md:gap-6 text-sm font-medium">
      {navLinks.map((link, i) => (
        <a
          key={link.label}
          href={link.href}
          className={`relative px-3 py-1 rounded-lg transition-all duration-300 ease-in-out transform 
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
            delay-[${i * 100}ms]
            ${
              pathname === link.href
                ? 'bg-orange-100 text-orange-600 font-semibold'
                : 'text-gray-600 hover:text-green-700 hover:bg-green-100 hover:scale-105'
            }`}
        >
          {link.label}
        </a>
      ))}
    </nav>

        {/* Online Badge */}
        <div className="hidden md:flex items-center gap-1 text-green-600 font-semibold text-sm">
          <span className="text-lg">●</span> Online
        </div>
      </div>
    </header>
  )
}
