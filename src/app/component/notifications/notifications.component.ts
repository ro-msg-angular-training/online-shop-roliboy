import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectNotifications } from 'src/app/store/reducer/notification.reducer';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications$ = this.store.pipe(select(selectNotifications));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
