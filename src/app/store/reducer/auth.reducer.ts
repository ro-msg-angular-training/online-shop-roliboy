import { createSelector } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../action/auth.action';
import { AppState } from '../state/app.state';
import { AuthState, initialAuthState } from '../state/auth.state';

export const authReducer = (
  state = initialAuthState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.AuthLoginSuccess: {
      return {
        user: action.payload,
        hasAuthError: false,
        authErrorMessage: '',
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.AuthLoginError: {
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

const authState = (state: AppState) => state.auth;

export const selectUser = createSelector(
  authState,
  (state: AuthState) => state.user
);

export const selectHasAuthError = createSelector(
  authState,
  (state: AuthState) => state.hasAuthError
);

export const selectAuthErrorMessage = createSelector(
  authState,
  (state: AuthState) => state.authErrorMessage
);

export const selectIsAdmin = createSelector(authState, (state: AuthState) =>
  state.user?.roles.includes('admin')
);

export const selectIsCustomer = createSelector(authState, (state: AuthState) =>
  state.user?.roles.includes('customer')
);
