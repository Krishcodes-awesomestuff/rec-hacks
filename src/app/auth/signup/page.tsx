'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add signup logic here
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10">
        <h1 className="text-3xl font-bold mb-8 text-[#DA291C]">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-[#DA291C]"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-[#DA291C]"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-[#DA291C]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#DA291C] rounded-lg font-medium hover:bg-[#DA291C]/90 transition-all"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#DA291C] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  )
}