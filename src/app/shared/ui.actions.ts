import { Action } from '@ngrx/store';

import { SET_BUSY_STATE } from './ui.actionTypes';

export class SetBusyState implements Action {
  readonly type = SET_BUSY_STATE;

  constructor(readonly payload: boolean) {}
}

export type UIActions = SetBusyState;
