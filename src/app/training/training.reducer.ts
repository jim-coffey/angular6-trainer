import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import { TrainingActions } from './training.actions';
import { SET_AVAILABLE_EXERCISES, SET_FINISHED_EXERCISES, START_TRAINING, STOP_TRAINING } from './training.actionTypes';
import { Exercise } from './exercise.model';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface AppState extends fromRoot.AppState {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(state: TrainingState = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.payload
      };

    case SET_FINISHED_EXERCISES:
      return {
        ...state,
        finishedExercises: action.payload
      };

    case START_TRAINING:
      return {
        ...state,
        activeTraining: { ...state.availableExercises.find(exercise => exercise.id === action.payload) }
      };

    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };

    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);
export const isActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining !== null
);
