import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercisesCollection: AngularFirestoreCollection<Exercise>;
  exercises: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) {}

  ngOnInit() {
    this.exercisesCollection = this.db.collection<Exercise>('availableExercises');
    this.exercises = this.exercisesCollection.valueChanges();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
