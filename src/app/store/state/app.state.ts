import { AuthState, initialAuthState } from './auth.state';
import { CartState, initialCartState } from './cart.state';
import { initialProductState, ProductState } from './product.state';

export interface AppState {
  cart: CartState;
  product: ProductState;
  auth: AuthState;
}

export const initialAppState: AppState = {
  cart: initialCartState,
  product: initialProductState,
  auth: initialAuthState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
