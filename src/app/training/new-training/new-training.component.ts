import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { getAvailableExercises } from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  public exercises$: Observable<Exercise[]>;
  public isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.AppState>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsUIBusy);
    this.exercises$ = this.store.select(getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
