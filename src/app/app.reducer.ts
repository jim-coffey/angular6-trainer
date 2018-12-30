import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';

export interface AppState {
  ui: fromUI.UIState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer
};

export const getUIState = createFeatureSelector<fromUI.UIState>('ui');
export const getIsUIBusy = createSelector(
  getUIState,
  fromUI.getIsBusy
);
