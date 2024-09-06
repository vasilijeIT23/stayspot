// ErrorBoundaryWrapper.tsx
import SignInForm from '@stayspot/ui/components/login/loginForm'
import MyFallbackComponent from '@stayspot/util/tools/fallbackComponent'
import { ErrorBoundary } from 'react-error-boundary'

const Page: React.FC = () => {
  return (
    <div>
      <ErrorBoundary FallbackComponent={MyFallbackComponent}>
        <SignInForm />
      </ErrorBoundary>
    </div>
  )
}

export default Page
