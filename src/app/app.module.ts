import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AngularFireModule } from 'angularfire2';

import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { UIService } from './shared/ui.service';

@NgModule({
  declarations: [
    AppComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatMomentDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule {}
