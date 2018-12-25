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
      valueView: 'Crunches'
    },
    {
      value: 'touch-toes',
      valueView: 'Touch Toes'
    },
    {
      value: 'side-lunges',
      valueView: 'Side Lunges'
    },
    {
      value: 'burpees',
      valueView: 'Burpees'
    }
  ];

  constructor() {}

  ngOnInit() {}

  onStartTraining() {
    this.trainingStart.emit();
  }
}
