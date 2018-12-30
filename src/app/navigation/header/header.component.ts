import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.AppState>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthorised);
  }

  onLogout() {
    this.authService.logout();
  }

  onToggleSideNav() {
    this.sidenavToggle.emit();
  }
}
