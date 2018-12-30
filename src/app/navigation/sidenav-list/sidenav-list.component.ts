import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.AppState>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthorised);
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  onClose() {
    this.sidenavClose.emit();
  }
}
