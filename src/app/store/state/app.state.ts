import { AuthState, initialAuthState } from './auth.state';
import { CartState, initialCartState } from './cart.state';
import {
  initialNotificationState,
  NotificationState,
} from './notification.state';
import { initialProductState, ProductState } from './product.state';

export interface AppState {
  cart: CartState;
  product: ProductState;
  auth: AuthState;
  notification: NotificationState;
}

export const initialAppState: AppState = {
  cart: initialCartState,
  product: initialProductState,
  auth: initialAuthState,
  notification: initialNotificationState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
