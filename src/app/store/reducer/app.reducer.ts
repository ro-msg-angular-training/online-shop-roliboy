import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { authReducer } from './auth.reducer';
import { cartReducer } from './cart.reducer';
import { notificationReducer } from './notification.reducer';
import { preloadReducer } from './preload.reducer';
import { productReducer } from './product.reducer';

export const appReducer: ActionReducerMap<AppState, any> = {
  cart: cartReducer,
  product: productReducer,
  auth: authReducer,
  notification: notificationReducer,
  preload: preloadReducer,
};
