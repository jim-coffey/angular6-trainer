import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output()
  trainingStart = new EventEmitter<void>();

  exercises = [
    {
      value: 'crunches',
      viewValue: 'Crunches'
    },
    {
      value: 'touch-toes',
      viewValue: 'Touch Toes'
    },
    {
      value: 'side-lunges',
      viewValue: 'Side Lunges'
    },
    {
      value: 'burpees',
      viewValue: 'Burpees'
    }
  ];

  constructor() {}

  ngOnInit() {}

  onStartTraining() {
    this.trainingStart.emit();
  }
}
