import { Action } from '@ngrx/store';

import { SET_AUTH_STATE } from './auth.actionTypes';

export class AuthAction implements Action {
  readonly type = SET_AUTH_STATE;

  constructor(readonly payload: boolean) {}
}

export type AuthActions = AuthAction;
