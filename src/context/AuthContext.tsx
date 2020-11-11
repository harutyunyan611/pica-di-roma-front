import React, { createContext, useContext, useReducer } from 'react';
import {IAuthState} from "../types/context/IAuthState";
import {IAuthActions} from "../types/context/IAuthActions";
import {AuthContextReducer} from "../reducers/AuthContextReducer";

const storageAuthToken = localStorage.getItem('token');

const initialState: IAuthState = {
  authToken: storageAuthToken || '',
};

const initialAuthContext: { authDataState: IAuthState; setAuthDataState: React.Dispatch<IAuthActions> } = {
  authDataState: initialState,
  setAuthDataState: () => {
  },
};

const AuthContext = createContext(initialAuthContext);

export function AuthContextProvider({ children }: any) {

  const [authDataState, setAuthDataState] = useReducer(AuthContextReducer, initialState);

  return <AuthContext.Provider
    value={{ authDataState, setAuthDataState }}>{children}</AuthContext.Provider>;
}

export const UseAuthDataStateValue = () => useContext(AuthContext);
