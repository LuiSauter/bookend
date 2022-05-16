/* eslint-disable indent */
import { IUser, UserState } from 'src/interfaces/Users'

type Action = { type: '@add-users'; payload: IUser[] }


export const UserReducer = (state: UserState, action: Action) => {
  const { type } = action
  switch (type) {
    case '@add-users':
      return {
        users: action.payload,
      }
    default:
      return state
  }
}
