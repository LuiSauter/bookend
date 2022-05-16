import React, { createContext, useReducer } from 'react'
import { IUser, UserState } from 'src/interfaces/Users'
import { UserReducer } from './UserReducer'

const initialState: UserState = {
  users: [],
}
/** Types */
type UserContextProps = {
  userState: UserState
  addUsers: (users: IUser[]) => void
}
interface Props {
  children: JSX.Element | JSX.Element[]
}

/** Context */
export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
)

/** Provider state */
export const UserStateProvider = ({ children }: Props): JSX.Element => {
  const [userState, dispatch] = useReducer(UserReducer, initialState)

  function addUsers(users: IUser[]) {
    dispatch({
      type: '@add-users',
      payload: users,
    })
  }

  return (
    <UserContext.Provider value={{ userState, addUsers }}>
      {children}
    </UserContext.Provider>
  )
}