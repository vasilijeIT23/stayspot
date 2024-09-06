'use client'

import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './main.css'
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@stayspot/network/src/config/apollo'
import { Header } from '@stayspot/ui/components/header/header'
import { AuthProvider } from '@stayspot/util/hooks/authContext'
import { ErrorBoundary } from 'react-error-boundary'
import MyFallbackComponent from '@stayspot/util/tools/fallbackComponent'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <AuthProvider>
        <SessionProvider>
          <ApolloProvider>
            <body className={`${inter.className}`}>
              <ErrorBoundary FallbackComponent={MyFallbackComponent}>
                <Header />
                {children}
              </ErrorBoundary>
            </body>
          </ApolloProvider>
        </SessionProvider>
      </AuthProvider>
    </html>
  )
}
