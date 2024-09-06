import { ReactNode } from 'react'

export type MenuItem = { label: string; href: string }

export type Role = 'admin' | 'manager' | 'customer'

export type BaseComponent = {
  children?: ReactNode
  className?: string
}
