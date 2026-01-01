'use client'

import { useState, useEffect } from 'react'
import { Lock } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if already authenticated in session storage
    const auth = sessionStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    setIsChecking(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple password check - in production, use proper authentication
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

    if (password === adminPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      setError('')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
    setPassword('')
  }

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white">
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter password to access lead management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              Default password: admin123
              <br />
              Set NEXT_PUBLIC_ADMIN_PASSWORD in .env.local to change
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <Lock className="w-4 h-4 text-primary-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Admin Portal</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}
