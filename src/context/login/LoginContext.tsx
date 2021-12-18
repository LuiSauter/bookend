import { createContext } from 'react'

type IsLogged = {
  profile: string;
  setProfileId: (profile: string) => void;
};

export const LoginContext = createContext<IsLogged>({} as IsLogged)
