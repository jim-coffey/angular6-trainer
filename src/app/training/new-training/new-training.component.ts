import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[];
  private exercisesSub: Subscription;

  constructor(private trainingService: TrainingService) {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnInit() {
    this.exercisesSub = this.trainingService.exercisesChanged.subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    });
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    this.exercisesSub.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
