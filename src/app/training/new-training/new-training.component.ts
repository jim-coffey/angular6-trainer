import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { State } from '../../app.reducer';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  private exercisesSub: Subscription;

  public exercises: Exercise[];
  public isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<{ ui: State }>) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(({ ui: { isBusy } }) => isBusy));
    this.exercisesSub = this.trainingService.exercisesChanged.subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    });
    this.fetchExercises();
  }

  ngOnDestroy() {
    if (this.exercisesSub) {
      this.exercisesSub.unsubscribe();
    }
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
