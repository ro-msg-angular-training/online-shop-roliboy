import { createSelector } from '@ngrx/store';
import { PreloadActions, PreloaderActionTypes } from '../action/preload.action';
import { AppState } from '../state/app.state';
import { initialPreloadState, PreloadState } from '../state/preload.state';

export const preloadReducer = (
  state = initialPreloadState,
  action: PreloadActions
): PreloadState => {
  switch (action.type) {
    case PreloaderActionTypes.ShowPreloader: {
      return {
        ...state,
        isActive: true
      };
    }
    case PreloaderActionTypes.HidePreloader: {
      return {
        ...state,
        isActive: false
      };
    }
    default:
      return state;
  }
};

const preloadState = (state: AppState) => state.preload;

export const selectIsPreloaderActive = createSelector(
  preloadState,
  (state: PreloadState) => state.isActive
);
