import { createSelector } from '@ngrx/store';
import { AuthActions, EAuthActions } from '../action/auth.action';
import { IAppState } from '../state/app.state';
import { IAuthState, initialAuthState } from '../state/auth.state';

export const authReducer = (
  state = initialAuthState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case EAuthActions.AuthLoginSuccess: {
      return {
        user: action.payload,
        hasAuthError: false,
        authErrorMessage: '',
        isAuthenticated: true,
      };
    }
    case EAuthActions.AuthLoginError: {
      return {
        user: undefined,
        hasAuthError: true,
        authErrorMessage: action.payload.error,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};

const authState = (state: IAppState) => state.auth;

export const selectUser = createSelector(
  authState,
  (state: IAuthState) => state.user
);

export const selectHasAuthError = createSelector(
  authState,
  (state: IAuthState) => state.hasAuthError
);

export const selectAuthErrorMessage = createSelector(
  authState,
  (state: IAuthState) => state.authErrorMessage
);

export const selectIsAdmin = createSelector(authState, (state: IAuthState) =>
  state.user?.roles.includes('admin')
);

export const selectIsCustomer = createSelector(authState, (state: IAuthState) =>
  state.user?.roles.includes('customer')
);
