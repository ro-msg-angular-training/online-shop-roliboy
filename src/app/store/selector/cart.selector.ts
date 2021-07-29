import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ICartState } from '../state/cart.state';

const appState = (state: IAppState) => state;
const cartState = (state: IAppState) => state.cart;

export const selectCartItems = createSelector(
  cartState,
  (state: ICartState) => state.items
);

export const selectCartItemsWithProductData = createSelector(
  appState,
  (state: IAppState) =>
    state.cart.items.map((item) => {
      return {
        ...item,
        ...state.product.products.find(
          (product) => product.id == item.productId
        ),
      };
    })
);
