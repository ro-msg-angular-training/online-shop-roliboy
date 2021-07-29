import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { authReducer } from './auth.reducer';
import { cartReducer } from './cart.reducer';
import { productReducer } from './product.reducer';

export const appReducer: ActionReducerMap<AppState, any> = {
  cart: cartReducer,
  product: productReducer,
  auth: authReducer,
};
