import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material';

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
    this.exercises = this.exercisesCollection.snapshotChanges().pipe(
      map(documents => {
        return documents.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      })
    );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
