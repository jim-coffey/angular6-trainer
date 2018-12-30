import { UIActions } from './ui.actions';

import { SET_BUSY_STATE } from './ui.actionTypes';

export interface UIState {
  isBusy: boolean;
}

const initialState = {
  isBusy: false
};

export const uiReducer = (state: UIState = initialState, action: UIActions) => {
  switch (action.type) {
    case SET_BUSY_STATE:
      return {
        ...state,
        isBusy: action.payload
      };

    default:
      return state;
  }
};

export const getIsBusy = (state: UIState) => state.isBusy;
