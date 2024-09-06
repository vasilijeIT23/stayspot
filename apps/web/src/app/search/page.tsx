'use client'

import { SearchPage } from '@stayspot/ui/components/search/SearchPage'
import React from 'react'
import { useAuth } from '@stayspot/util/hooks/authContext'
import { notFound } from 'next/navigation'
import MyFallbackComponent from '@stayspot/util/tools/fallbackComponent'
import { ErrorBoundary } from 'react-error-boundary'
import Title from '@stayspot/ui/components/shared_components/dashboard/Title'

export default function Page() {
  const { isUserAuthenticated } = useAuth()

  if (isUserAuthenticated()) {
    return (
      <div>
        <ErrorBoundary FallbackComponent={MyFallbackComponent}>
          <SearchPage />
        </ErrorBoundary>
      </div>
    )
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Title>Not Found</Title>
    </div>
  )
}
