export interface IUser {
  email: string
  name: string
  photo: string
  username: string
  user: string
  verified: boolean
  email?: string
  description?: string
  __typename?: string
}

export interface UserState {
  users: IUser[]
}