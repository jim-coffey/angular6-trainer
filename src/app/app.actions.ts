import { SET_BUSY_STATE } from './app.actionTypes';

export const setBusyState = (busyState: boolean) => ({
  type: SET_BUSY_STATE,
  payload: busyState
});
