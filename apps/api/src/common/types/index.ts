export type Role = 'admin' | 'manager' | 'customer'

export type GetUserType = {
  uid: string
  roles: Role[]
}
