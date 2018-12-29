import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  private ongoingSubscription: Subscription;
  ongoingTraining = false;

  constructor(private traininService: TrainingService) {}

  ngOnInit() {
    this.ongoingSubscription = this.traininService.trainingChange.subscribe(trainingExercise => {
      this.ongoingTraining = trainingExercise ? true : false;
    });
  }

  ngOnDestroy() {
    if (this.ongoingSubscription) {
      this.ongoingSubscription.unsubscribe();
    }
  }
}
