'use client'

import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '@stayspot/network/clients/users/mutations'
import { useRouter } from 'next/navigation'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useAuth } from '@stayspot/util/hooks/authContext'
import React from 'react'
import { toast, ToastContainer } from '../shared_components/message/Toast'
import 'react-toastify/dist/ReactToastify.css'
import { BaseContainer } from '../shared_components/BaseContainer'
import { LoginForm } from '../../components/shared_components/input_types/CredentialsInput'
import { BaseDialog } from '../shared_components/BaseDialog'
import ChangePasswordDialog from '../updateCredentials/changePasswordDialog'

function setCookie(
  name,
  value,
  days = null,
  path = '/',
  domain = '',
  secure = false,
  sameSite = 'Lax',
) {
  let cookieString = `${name}=${encodeURIComponent(value)};path=${path}`

  if (domain) {
    cookieString += `;domain=${domain}`
  }

  if (secure) {
    cookieString += ';secure'
  }

  cookieString += `;samesite=${sameSite}`

  if (days !== null) {
    // Calculate the expiration date if `days` is provided
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    cookieString += `;expires=${expires.toUTCString()}`
  }

  // Set the cookie with the constructed string
  document.cookie = cookieString
}

const SignInForm: React.FC = () => {
  const { setToken, setUid, setRoles, setName, login } = useAuth()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    errors: {
      email: false,
      password: false,
    },
  })
  const [loginUser] = useMutation(LOGIN_USER)
  const { replace } = useRouter()
  const [open, setOpen] = React.useState(false)

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  useEffect(() => {
    const newErrors = {
      email:
        !formState.email.includes('@') || !formState.email.includes('.com'),
      password: formState.password.length <= 7,
    }

    setFormState((prevState) => ({
      ...prevState,
      errors: newErrors,
    }))
  }, [formState.email, formState.password])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setToken(undefined)
    setUid(undefined)
    setRoles(undefined)
    setName(undefined)

    try {
      const { data } = await loginUser({
        variables: {
          loginInput: {
            email: formState.email,
            password: formState.password,
          },
        },
      })

      const token = data?.login.token
      const user = data?.login.user

      if (token && user) {
        setToken(token)
        setUid(user?.uid)
        setRoles([user?.admin, user?.manager, user?.customer])
        setName(user?.name)
        setCookie('next-auth.session-token', token)
        login()
        replace('/')
      } else {
        toast('Missing data')
      }
    } catch (error) {
      toast('Invalid credentials, please try again.')
      console.error('Error logging in:', error)
    }
  }

  const { errors } = formState

  return (
    <>
      <div style={{ marginTop: 150 }}></div>
      <BaseContainer>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <LoginForm
          formState={formState}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          emailError={errors.email}
          passwordError={errors.password}
        />
        <Grid container>
          <Grid item xs>
            <button onClick={handleClickOpen}>Forgot password?</button>
            <BaseDialog
              handleClickOpen={open}
              handleClose={handleClose}
              title="Change Password"
              text="Here you can change your password"
              fullscreen={false}
            >
              <ChangePasswordDialog email={formState.email} />
            </BaseDialog>
          </Grid>
          <Grid item>
            <Link
              href="/register"
              variant="body2"
              sx={{
                color: 'black',
                '&:hover': { backgroundColor: 'lightgray' },
              }}
            >
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </BaseContainer>
      <ToastContainer />
    </>
  )
}

export default SignInForm
