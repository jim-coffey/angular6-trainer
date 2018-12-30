import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';

import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import * as UI from '../shared/ui.actions';
import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.AppState>
  ) {}

  public cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  public fetchAvailableExercises() {
    this.store.dispatch(new UI.SetBusyState(true));
    this.fbSubs.push(
      this.db
        .collection<Exercise>('availableExercises')
        .snapshotChanges()
        .pipe(
          map(documents => {
            return documents.map(doc => {
              return {
                id: doc.payload.doc.id,
                ...doc.payload.doc.data()
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.SetBusyState(false));
            this.store.dispatch(new Training.SetAvailableExercises(exercises));
          },
          error => {
            this.store.dispatch(new UI.SetBusyState(false));
            this.uiService.showSnackbar('Fetching exercises failed, please try again later', null, 3000);
          }
        )
    );
  }

  public startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  public completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(exercise => {
        this.addExerciseToDatabase({
          ...exercise,
          date: new Date(),
          state: 'completed'
        });
      });
    this.store.dispatch(new Training.StopTraining());
  }

  public cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(exercise => {
        this.addExerciseToDatabase({
          ...exercise,
          duration: exercise.duration * (progress / 100),
          calories: exercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled'
        });
      });
    this.store.dispatch(new Training.StopTraining());
  }

  public fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedExercises(exercises));
        })
    );
  }

  private addExerciseToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
