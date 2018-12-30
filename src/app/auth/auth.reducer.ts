import { AuthActions } from './auth.actions';

import { SET_AUTH_STATE } from './auth.actionTypes';

export interface AuthState {
  isAuth: boolean;
}

const initialState = {
  isAuth: false
};

export const authReducer = (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case SET_AUTH_STATE:
      return {
        ...state,
        isAuth: action.payload
      };

    default:
      return state;
  }
};

export const getIsAuth = (state: AuthState) => state.isAuth;
