import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromRoot from '../app.reducer';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private uiService: UIService, private store: Store<fromRoot.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuthorised).pipe(take(1));
  }

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuthorised).pipe(take(1));
  }
}
