import { TypedDocumentNode } from '@apollo/client/core/types'
import { print } from '@apollo/client/utilities'

export interface FetchResult<TData> {
  data?: TData
  error?: string
}

export interface GraphqlRequestOptions<V> {
  mutation: TypedDocumentNode<any, V> // Use 'any' for TData as the mutation may return various shapes
  variables: V
  config?: RequestInit
  token?: string
}

/**
 * Fetches data from a GraphQL endpoint using POST method.
 * @param {TypedDocumentNode<any, V>} mutation - The GraphQL mutation document
 * @param {V} variables - The variables for the GraphQL mutation
 * @param {RequestInit} [config] - Optional configuration for the fetch request
 * @param {string} [token] - Optional authorization token for authenticated requests
 * @returns {Promise<FetchResult<any>>} The result of the GraphQL request
 */
export async function fetchGraphQL<V>({
  mutation,
  variables,
  config,
  token,
}: GraphqlRequestOptions<V>): Promise<FetchResult<any>> {
  const query = print(mutation)

  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
    ...config,
  }).then(async (res) => {
    const { data, errors } = await res.json()
    if (errors) {
      console.log('Error', JSON.stringify(errors))
      return { error: JSON.stringify(errors[0].message) }
    }
    return { data }
  })
}
