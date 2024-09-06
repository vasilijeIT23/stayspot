'use client'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client'
import { ReactNode } from 'react'
import { setContext } from '@apollo/client/link/context'

export interface IApolloProviderProps {
  children: ReactNode
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
  })

  const authLink = setContext(async (_, { headers }) => {
    const token = await fetch('/api/auth/token').then((res) => res.json())

    return {
      headers: {
        ...headers,
        authorization: token
          ? `Bearer ${token}`
          : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZGUyYzIyNS1lYmQxLTQ1ZmYtYjdiYy0wYjdhODg1ZjI0ZjAiLCJuYW1lIjoiYXNkZmprbCIsImVtYWlsIjoiYXNkYXNAc2ZzZGYuZnMiLCJwaWN0dXJlIjpudWxsLCJleHAiOjE3MTk3NDE4NTksImlhdCI6MTcxOTY1NTQ1OX0.sz6t7oEf-dM2_D8ncxxe3MxjPhWAnVAwu3IU2-xTmIA',
      },
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
  return <Provider client={apolloClient}>{children}</Provider>
}
