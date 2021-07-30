import { Action } from '@ngrx/store';

export enum PreloaderActionTypes {
  ShowPreloader = '[preloader] show',
  HidePreloader = '[prleoader] hide',
}

export class ShowPreloader implements Action {
  public readonly type = PreloaderActionTypes.ShowPreloader;
}

export class HidePreloader implements Action {
  public readonly type = PreloaderActionTypes.HidePreloader;
}

export type PreloadActions = ShowPreloader | HidePreloader;
