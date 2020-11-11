import React, { createContext, useReducer, useContext } from 'react';
import {IGlobalShopDataState} from "../types/context/IGlobalShopDataState";
import {IGlobalShopDataActions} from "../types/context/IGlobalShopDataActions";
import {GlobalShopContextReducer} from "../reducers/GlobalShopContextReducer";

export enum Currencies {
  dollar="dollar",
  euro="euro"
}
export const initialState: IGlobalShopDataState = {
  globalShopData: {
    isShopCardOpened: false,
    shopBagData: [],
    shopBagTotal: 150,
    shopBagItemsCount: 0,
    currency: Currencies.dollar,
  }
};

const initialGlobalShopDataContext: { globalShopDataState: IGlobalShopDataState; setGlobalShopDataState: React.Dispatch<IGlobalShopDataActions> } = {
  globalShopDataState: initialState,
  setGlobalShopDataState: () => {
  },
};

const GlobalShopDataContext = createContext(initialGlobalShopDataContext);

export function GlobalShopDataContextProvider({ children }: any) {

  const [globalShopDataState, setGlobalShopDataState] = useReducer(GlobalShopContextReducer, initialState);

  return <GlobalShopDataContext.Provider
    value={{ globalShopDataState, setGlobalShopDataState }}>{children}</GlobalShopDataContext.Provider>;
}

export const UseGlobalShopDataStateValue = () => useContext(GlobalShopDataContext);
