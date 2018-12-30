import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { TrainingRoutes } from './training-routing.module';
import { SharedModule } from '../shared/shared.module';

import { trainingReducer } from './training.reducer';

import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [SharedModule, TrainingRoutes, StoreModule.forFeature('training', trainingReducer)],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
