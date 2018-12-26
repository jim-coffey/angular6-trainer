import { Subject } from 'rxjs/Subject';

import { Exercise } from './exercise.model';

export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 12 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private runningExercise: Exercise;
  public trainingChange = new Subject<Exercise>();
  private exercises: Exercise[] = [];

  public getAvailableExercises() {
    return this.availableExercises.slice();
  }

  public startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId);
    this.trainingChange.next({ ...this.runningExercise });
  }

  public completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.trainingChange.next(null);
  }

  public cancelExercise(progress: number) {
    this.exercises.push({
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

  public getCompletedOrCancelledExercises() {
    return this.exercises;
  }
}
