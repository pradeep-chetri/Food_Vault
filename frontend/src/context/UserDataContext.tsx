import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

type User = {
  username: string
  email: string
}

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null)

  // Load user from /auth/me using token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) return

    axios.get("http://localhost:8000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setUserState(res.data)
    })
    .catch(err => {
      console.error("Failed to fetch user:", err)
      localStorage.removeItem("token")
      setUserState(null)
    })
  }, [])

  // Use only in-memory context; don't persist to localStorage
  const setUser = (user: User | null) => {
    setUserState(user)
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used inside <UserProvider>")
  return context
}
