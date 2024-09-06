import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions, getServerSession } from 'next-auth'
import { LOGIN_USER } from '../../clients/users/mutations'
import * as jwt from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import { fetchGraphQL } from '../../fetch'

const MAX_AGE = 60 * 60 * 24

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error('Email and password are required')
        }
        const { email, password } = credentials
        try {
          // Execute LOGIN_USER mutation
          const { data } = await fetchGraphQL({
            mutation: LOGIN_USER,
            variables: {
              loginInput: {
                email,
                password,
              },
            },
          })

          // If login successful, return user data
          const user = data.login.user
          return user
        } catch (error) {
          console.error('Error logging in:', error)
          throw new Error('Invalid credentials') // Or handle error appropriately
        }
      },
    }),
  ],

  debug: true,

  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },

  jwt: {
    maxAge: MAX_AGE,

    async encode({ token, secret }): Promise<string> {
      if (!token) {
        throw new Error('Token is undefined')
      }
      const { sub, ...tokenProps } = token
      const nowInSeconds = Math.floor(Date.now() / 1000)
      const expirationTimestamp = nowInSeconds + MAX_AGE
      return jwt.sign(
        { uid: sub, ...tokenProps, exp: expirationTimestamp },
        secret,
        {
          algorithm: 'HS256',
        },
      )
    },

    async decode({ token, secret }): Promise<JWT | null> {
      if (!token) {
        throw new Error('Token is undefined')
      }
      try {
        const decodedToken = jwt.verify(token, secret, {
          algorithms: ['HS256'],
        })
        return decodedToken as JWT
      } catch (e) {
        return null
      }
    },
  },

  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user = {
          image: token.picture,
          uid: (token.uid as string) || '',
          email: token.email,
          name: token.email,
        }
      }
      return session
    },
  },

  pages: {
    signIn: '/signIn',
  },
}

export const getAuth = () => getServerSession(authOptions)
