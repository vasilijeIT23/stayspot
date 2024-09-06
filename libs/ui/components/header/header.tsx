'use client'
import Link from 'next/link'
import { useAuth } from '../../../util/hooks/authContext'
import Image from 'next/image'
import '../../styles/header.css'
import styles from '../../styles/header.module.css'
import { Button } from '@mui/material'
import { IconDoorExit } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function deleteCookie(
  name,
  path = '/',
  domain = '',
  secure = false,
  sameSite = 'Lax',
) {
  // Set the cookie's expiration date to a past date
  const expires = new Date(0).toUTCString()

  // Construct the cookie string
  let cookieString = `${name}=;expires=${expires};path=${path}`

  if (domain) {
    cookieString += `;domain=${domain}`
  }

  if (secure) {
    cookieString += ';secure'
  }

  cookieString += `;samesite=${sameSite}`

  // Set the cookie with the constructed string to delete it
  document.cookie = cookieString
}

export const Header = () => {
  const { roles, token, logout } = useAuth()
  const { replace } = useRouter()

  // const [pathname, setPathname] = useState('');

  // useEffect(() => {
  //   setPathname(window.location.pathname);

  // }, [])

  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const logOut = () => {
    deleteCookie('next-auth.session-token')
    logout()
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/" aria-label="Home">
            <Image
              alt="logo"
              src="/logo_2.png"
              width={100}
              height={50}
              // Ensure the image is properly loaded
            />
          </Link>
        </div>
        <div className={styles.name}>
          <Link href="/" aria-label="Home">
            <Image
              alt="name"
              src="/name.png"
              width={400}
              height={100}
              // Ensure the image is properly loaded
            />
          </Link>
        </div>
        <div className={styles['auth-buttons']}>
          {token ? (
            <div className={styles.sidebar}>{/* <TemporaryDrawer /> */}</div>
          ) : (
            <>
              <Button
                sx={{ color: 'darkgrey' }}
                className={`${styles.button} ${styles['button-outlined']}`}
                onClick={() => {
                  replace('/register')
                }}
              >
                Register
              </Button>
              <Button
                sx={{ color: 'darkgrey' }}
                className={`${styles.button} ${styles['button-outlined']}`}
                onClick={() => {
                  replace('/login')
                }}
              >
                Log in
              </Button>
            </>
          )}
        </div>
        <div>
          <div>{open == true ? <></> : <></>}</div>
          {roles != undefined ? (
            <>
              {roles[0] != null || roles[1] != null ? (
                <>
                  {/* <Button
                    sx={{color: 'black'}}
                    className={`${styles.button} ${styles['button-outlined']}`}
                    onClick={() => {
                      replace('/dashboard')
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    sx={{color: 'black'}}
                    className={`${styles.button} ${styles['button-primary']}`}
                    onClick={logout}
                  >
                    <IconDoorExit /> Logout
                  </Button> */}
                </>
              ) : (
                <div></div>
              )}
              <Button
                sx={{ color: 'black' }}
                className={`${styles.button} ${styles['button-outlined']}`}
                onClick={() => {
                  replace('/dashboard')
                }}
              >
                Dashboard
              </Button>
              <Button
                sx={{ color: 'black' }}
                className={`${styles.button} ${styles['button-outlined']}`}
                onClick={() => {
                  replace('/')
                }}
              >
                Home
              </Button>
              <Button
                sx={{ color: 'black' }}
                className={`${styles.button} ${styles['button-primary']}`}
                onClick={logOut}
              >
                <IconDoorExit /> Logout
              </Button>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
