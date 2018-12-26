import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

const PERCENTAGE = 100;
const MILLISECONDS = 1000;
const STEP_MODIFIER = PERCENTAGE / MILLISECONDS;

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();
  progress: number = 0;
  timer: number;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration / STEP_MODIFIER;
    this.timer = window.setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
