import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';

import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { UIService } from './shared/ui.service';

import { reducers } from './app.reducer';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, HeaderComponent, SidenavListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    MatMomentDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule {}
