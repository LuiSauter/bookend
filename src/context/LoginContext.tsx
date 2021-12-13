import { createContext } from 'react'

type IsLogged = {
  isLogged: boolean;
};

export const LoginContext = createContext<IsLogged>({} as IsLogged)
