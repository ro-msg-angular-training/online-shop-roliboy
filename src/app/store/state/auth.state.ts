import { User } from 'src/app/model/user.model';

export interface AuthState {
  user?: User;
  hasAuthError: boolean;
  authErrorMessage: string;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  user: undefined,
  hasAuthError: false,
  authErrorMessage: '',
  isAuthenticated: false,
};
