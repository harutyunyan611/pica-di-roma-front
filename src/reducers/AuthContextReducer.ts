import {IAuthState} from "../types/context/IAuthState";
import {IAuthActions} from "../types/context/IAuthActions";
import {AuthContextDataStaticData} from "../static/AuthContextDataStaticData";

export const AuthContextReducer = (state: IAuthState, action: IAuthActions) => {
  switch (action.type) {
    case AuthContextDataStaticData.UPDATE_AUTH_TOKEN:
      localStorage.setItem('token', action.token);
      return {
        ...state, authToken: action.token,
      };
    default:
      return state;
  }
};
