import RegisterForm from '@stayspot/ui/components/register/registerForm'
import MyFallbackComponent from '@stayspot/util/tools/fallbackComponent'
import { ErrorBoundary } from 'react-error-boundary'

export default function Page() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={MyFallbackComponent}>
        <RegisterForm />
      </ErrorBoundary>
    </div>
  )
}
