import { SET_BUSY_STATE } from './app.actionTypes';

export interface State {
  isBusy: boolean;
}

const initialState: State = {
  isBusy: false
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BUSY_STATE:
      return {
        ...state,
        isBusy: action.payload
      };

    default:
      return state;
  }
}
