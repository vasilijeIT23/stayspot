'use client'

import React from 'react'

interface FallbackComponentProps {
  error: Error | null
  resetErrorBoundary: () => void
}

const MyFallbackComponent: React.FC<FallbackComponentProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div style={containerStyle}>
      <div style={fallbackStyle}>
        <div role="alert">
          <p>Something went wrong:</p>
          <pre>{error ? error.message : 'Unknown error'}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      </div>
    </div>
  )
}

// Styles for centering
const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional: semi-transparent background
}

const fallbackStyle: React.CSSProperties = {
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
}

export default MyFallbackComponent
