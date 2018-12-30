import { Action } from '@ngrx/store';

import { Exercise } from './exercise.model';
import { SET_AVAILABLE_EXERCISES, SET_FINISHED_EXERCISES, START_TRAINING, STOP_TRAINING } from './training.actionTypes';

export class SetAvailableExercises implements Action {
  readonly type = SET_AVAILABLE_EXERCISES;

  constructor(readonly payload: Exercise[]) {}
}

export class SetFinishedExercises implements Action {
  readonly type = SET_FINISHED_EXERCISES;

  constructor(readonly payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(readonly payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailableExercises | SetFinishedExercises | StartTraining | StopTraining;
