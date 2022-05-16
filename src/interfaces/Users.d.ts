export interface IUser {
  email: string
  name: string
  photo: string
  username: string
  user: string
  verified: boolean
}

export interface UserState {
  users: IUser[]
}