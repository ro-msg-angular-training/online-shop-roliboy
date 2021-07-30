import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectIsPreloaderActive } from 'src/app/store/reducer/preload.reducer';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-preload-spinner',
  templateUrl: './preload-spinner.component.html',
  styleUrls: ['./preload-spinner.component.scss'],
})
export class PreloadSpinnerComponent implements OnInit {
  show$ = this.store.pipe(select(selectIsPreloaderActive));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
