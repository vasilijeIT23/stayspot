'use client'

import React, { useEffect } from 'react'
import { notFound, useRouter } from 'next/navigation'
import { useAuth } from '@stayspot/util/hooks/authContext'
import MyFallbackComponent from '@stayspot/util/tools/fallbackComponent'
import { ErrorBoundary } from 'react-error-boundary'
import Profile from '@stayspot/ui/components/Profile'
import Title from '@stayspot/ui/components/dashboard/Title'
import styles from './home.module.css' // CSS Modules for styles

export default function Home() {
  const { replace } = useRouter()
  const { setToken, setUid, setName, setRoles, isUserAuthenticated } = useAuth()

  return (
    <ErrorBoundary FallbackComponent={MyFallbackComponent}>
      <div className={styles.container}>
        {isUserAuthenticated() ? (
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => replace('/search')}
            >
              Find your place to stay, just one click away!
            </button>
          </div>
        ) : (
          <div className={styles.title}>Not Found</div>
        )}
      </div>
    </ErrorBoundary>
  )
}
