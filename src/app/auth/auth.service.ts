import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import { setBusyState } from '../app.actions';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated: boolean;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.AppState>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      this.store.dispatch(new UI.BusyAction(false));
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
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

  getUser() {
    return this.isAuthenticated;
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
