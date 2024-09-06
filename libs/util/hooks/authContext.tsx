// context/AuthContext.tsx
'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useSessionStorage } from './session'

// Define a more appropriate type for roles
interface AuthContextType {
  token: string | undefined
  uid: string | undefined
  name: string | undefined
  roles: Array<string> | undefined // Adjust type based on actual data
  setToken: (token: string | undefined) => void
  setUid: (uid: string | undefined) => void
  setName: (name: string | undefined) => void
  setRoles: (roles: Array<string> | undefined) => void
  logout: () => void
  login: () => void
  isUserAuthenticated: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [getToken, setToken, removeToken] = useSessionStorage<string>('token')
  const [getUid, setUid, removeUid] = useSessionStorage<string>('uid')
  const [getRoles, setRoles, removeRoles] =
    useSessionStorage<Array<string>>('roles')
  const [getName, setName, removeName] = useSessionStorage<string>('name')

  const [token, setTokenState] = useState<string | undefined>(getToken())
  const [uid, setUidState] = useState<string | undefined>(getUid())
  const [roles, setRolesState] = useState<Array<string> | undefined>(getRoles())
  const [name, setNameState] = useState<string | undefined>(getName())

  const { replace } = useRouter()

  const isUserAuthenticated = () => {
    if (getToken() === undefined) {
      return false
    }
    return true
  }

  const login = () => {
    setTokenState(getToken())
    setUidState(getUid())
    setRolesState(getRoles())
    setNameState(getName())
  }

  const logout = () => {
    console.log('logging out')
    setTokenState(undefined)
    setUidState(undefined)
    setRolesState(undefined)
    setNameState(undefined)
    setToken(undefined)
    setUid(undefined)
    setRoles(undefined)
    setName(undefined)
    replace('/')
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        uid,
        setUid,
        name,
        setName,
        roles,
        setRoles,
        logout,
        login,
        isUserAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
