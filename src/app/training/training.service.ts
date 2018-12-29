import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
  private exercisesCollection: AngularFirestoreCollection<Exercise>;
  private availableExercises: Exercise[];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  public trainingChange = new Subject<Exercise>();
  public exercisesChanged = new Subject<Exercise[]>();
  public finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  public cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  public fetchAvailableExercises() {
    this.exercisesCollection = this.db.collection<Exercise>('availableExercises');
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(
      this.exercisesCollection
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
        .subscribe((exercises: Exercise[]) => {
          this.uiService.loadingStateChanged.next(false);
          this.availableExercises = exercises;
          this.exercisesChanged.next([...exercises]);
        })
    );
  }

  public getAvailableExercises() {
    return this.availableExercises.slice();
  }

  public startExercise(selectedId: string) {
    this.db.doc(`availableExercises/${selectedId}`).update({
      lastSelected: new Date()
    });
    this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId);
    this.trainingChange.next({ ...this.runningExercise });
  }

  public completeExercise() {
    this.addExerciseToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.trainingChange.next(null);
  }

  public cancelExercise(progress: number) {
    this.addExerciseToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.trainingChange.next(null);
  }

  public getRunningExercise() {
    return { ...this.runningExercise };
  }

  public fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }

  private addExerciseToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
