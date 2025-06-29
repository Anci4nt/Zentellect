'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { label: 'AI Chat', href: '/chat', active: false },
  { label: 'Study Timer', href: '/', active: false },
  { label: 'Notes', href: '/note', active: false },
]
const newNavLinks = [
  
  {label: "LogIn", href: "/login"},
  {label: "SignUp", href: "/signup"}
]

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { isDark } = useTheme()

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md shadow-md transition-colors duration-300 ${
        isDark
          ? 'bg-gray-900/80 border-b border-gray-700'
          : 'bg-white/80 border-b border-gray-200'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-700 ease-out">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shadow-sm transition-colors duration-300 ${
              isDark ? 'bg-green-700 text-white' : 'bg-green-800 text-white'
            }`}
          >
            🧠
          </div>
          <div>
            <h1
              className={`text-xl font-semibold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              StudyAI
            </h1>
            <p
              className={`text-xs -mt-1 transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Your learning companion
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-sm font-medium">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative px-3 py-1 rounded-lg transition-all duration-300 ease-in-out transform 
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                delay-[${i * 100}ms]
                ${
                  pathname === link.href
                    ? isDark
                      ? 'bg-orange-900/50 text-orange-400 font-semibold'
                      : 'bg-orange-100 text-orange-600 font-semibold'
                    : isDark
                    ? 'text-gray-300 hover:text-green-400 hover:bg-green-900/30 hover:scale-105'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-100 hover:scale-105'
                }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
         <nav className="flex gap-4 md:gap-6 text-sm font-medium">
          {newNavLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative px-3 py-1 rounded-lg transition-all duration-300 ease-in-out transform 
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                delay-[${i * 100}ms]
                ${
                  pathname === link.href
                    ? isDark
                      ? 'bg-orange-900/50 text-orange-400 font-semibold'
                      : 'bg-orange-100 text-orange-600 font-semibold'
                    : isDark
                      ? 'text-gray-300 hover:text-green-400 hover:bg-green-900/30 hover:scale-105'
                      : 'text-gray-600 hover:text-green-700 hover:bg-green-100 hover:scale-105'
                }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Theme Toggle and Online Badge */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
