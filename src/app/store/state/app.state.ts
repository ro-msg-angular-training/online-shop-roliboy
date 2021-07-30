import { AuthState, initialAuthState } from './auth.state';
import { CartState, initialCartState } from './cart.state';
import {
  initialNotificationState,
  NotificationState,
} from './notification.state';
import { initialPreloadState, PreloadState } from './preload.state';
import { initialProductState, ProductState } from './product.state';

export interface AppState {
  cart: CartState;
  product: ProductState;
  auth: AuthState;
  notification: NotificationState;
  preload: PreloadState;
}

export const initialAppState: AppState = {
  cart: initialCartState,
  product: initialProductState,
  auth: initialAuthState,
  notification: initialNotificationState,
  preload: initialPreloadState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
