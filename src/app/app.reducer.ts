import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
  ui: fromUI.UIState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
};

export const getUIState = createFeatureSelector<fromUI.UIState>('ui');
export const getIsUIBusy = createSelector(
  getUIState,
  fromUI.getIsBusy
);

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuthorised = createSelector(
  getAuthState,
  fromAuth.getIsAuth
);
