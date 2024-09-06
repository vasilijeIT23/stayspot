'use client'

import CreateCompanyForm from '@stayspot/ui/components/company/createCompanyForm'
import MyFallbackComponent from '@stayspot/util/tools/fallbackComponent'
import { ErrorBoundary } from 'react-error-boundary'
import { useAuth } from '@stayspot/util/hooks/authContext'
import Title from '@stayspot/ui/components/shared_components/dashboard/Title'

export default function Page() {
  const { isUserAuthenticated } = useAuth()

  if (isUserAuthenticated()) {
    return (
      <div>
        <ErrorBoundary FallbackComponent={MyFallbackComponent}>
          <CreateCompanyForm />
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
