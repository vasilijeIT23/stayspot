import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    uri: 'http://localhost:4000/graphql', // Your GraphQL server endpoint
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(): ApolloClient<NormalizedCacheObject> {
  // Initialize apolloClient only once
  apolloClient = apolloClient ?? createApolloClient()
  return apolloClient
}

export function useApollo(): ApolloClient<NormalizedCacheObject> {
  return initializeApollo()
}
