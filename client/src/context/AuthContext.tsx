import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '@/lib/axios'

export type User = { _id: string; username: string }

type AuthState = {
  user: User | null
  loading: boolean
  refresh: () => Promise<void>
}

const Ctx = createContext<AuthState>({ user: null, loading: true, refresh: async () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const res = await api.get('/profile')
      setUser(res.data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void refresh() }, [])

  return (
    <Ctx.Provider value={{ user, loading, refresh }}>
      {children}
    </Ctx.Provider>
  )
}

export const useAuth = () => useContext(Ctx)