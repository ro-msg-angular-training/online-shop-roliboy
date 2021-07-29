import { IUser } from 'src/app/model/user.model';

export interface IAuthState {
  user?: IUser;
  hasAuthError: boolean;
  authErrorMessage: string;
  isAuthenticated: boolean;
}

export const initialAuthState: IAuthState = {
  user: undefined,
  hasAuthError: false,
  authErrorMessage: '',
  isAuthenticated: false,
};
