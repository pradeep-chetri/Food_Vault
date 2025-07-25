import { createContext, useContext, useState, useEffect } from "react"

type User = {
  name: string
  email: string
}

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null)

  // Sync to localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) setUserState(JSON.parse(stored))
  }, [])

  const setUser = (user: User | null) => {
    setUserState(user)
    if (user) localStorage.setItem("user", JSON.stringify(user))
    else localStorage.removeItem("user")
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
