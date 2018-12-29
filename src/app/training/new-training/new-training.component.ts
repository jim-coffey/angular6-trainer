import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  private exercisesSub: Subscription;
  private loadingSub: Subscription;

  public exercises: Exercise[];
  public isLoading: boolean = false;

  constructor(private trainingService: TrainingService, private uiService: UIService) {}

  ngOnInit() {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe((loadingState: boolean) => {
      this.isLoading = loadingState;
    });
    this.exercisesSub = this.trainingService.exercisesChanged.subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    });
    this.fetchExercises();
  }

  ngOnDestroy() {
    if (this.exercisesSub) {
      this.exercisesSub.unsubscribe();
    }
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
