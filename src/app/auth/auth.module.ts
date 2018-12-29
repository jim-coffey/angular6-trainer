import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, AngularFireAuthModule, SharedModule]
})
export class AuthModule {}
