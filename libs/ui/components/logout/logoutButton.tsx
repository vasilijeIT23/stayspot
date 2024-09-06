'use client'
import { IconDoorExit } from '@tabler/icons-react'
import { Button } from '@mui/material'
import React = require('react')
import { useSessionStorage } from '../../../util/hooks/session'

export const LogoutButton = () => {
  const [getToken, setToken, removeToken] = useSessionStorage<string>('token')

  const [getUserData, setUserData, removeUserData] =
    useSessionStorage<string>('userData')
  return (
    <Button
      onClick={() => {
        removeToken()
        removeUserData()
      }}
      className="flex gap-2"
    >
      <IconDoorExit />
      Logout
    </Button>
  )
}
