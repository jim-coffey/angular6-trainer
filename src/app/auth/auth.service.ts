import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';
import { TrainingService } from '../training/training.service';
import { setBusyState } from '../app.actions';
import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  private isAuthenticated: boolean;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private uiService: UIService,
    private store: Store<fromRoot.AppState>,
    private trainingService: TrainingService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      this.store.dispatch(new UI.BusyAction(false));
      if (user) {
        this.store.dispatch(new Auth.AuthAction(true));
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.AuthAction(false));
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.BusyAction(true));
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).catch(error => {
      this.store.dispatch(setBusyState(false));
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.BusyAction(true));
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).catch(error => {
      this.store.dispatch(setBusyState(false));
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
