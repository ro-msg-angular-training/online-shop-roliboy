import { createSelector } from '@ngrx/store';
import { CartItem } from 'src/app/model/cart-item.model';
import { CartActions, CartActionTypes } from '../action/cart.action';
import { AppState } from '../state/app.state';
import { CartState, initialCartState } from '../state/cart.state';

export const cartReducer = (
  state = initialCartState,
  action: CartActions
): CartState => {
  switch (action.type) {
    case CartActionTypes.AddCartItemSuccess: {
      let item = state.items.find((item) => item.productId == action.payload);
      let items: CartItem[] = [];

      if (item === undefined)
        items = state.items.concat({ productId: action.payload, quantity: 1 });
      else
        items = state.items.map((item) =>
          item.productId == action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

      return {
        ...state,
        items,
      };
    }
    case CartActionTypes.RemoveCartItemSuccess: {
      let items = state.items.map((item) =>
        item.productId == action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      return {
        ...state,
        items: items.filter((item) => item.quantity > 0),
      };
    }
    case CartActionTypes.PlaceOrderSuccess: {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
};

const appState = (state: AppState) => state;
const cartState = (state: AppState) => state.cart;

export const selectCartItems = createSelector(
  cartState,
  (state: CartState) => state.items
);

export const selectCartItemsWithProductData = createSelector(
  appState,
  (state: AppState) =>
    state.cart.items.map((item) => {
      return {
        ...item,
        ...state.product.products.find(
          (product) => product.id == item.productId
        ),
      };
    })
);
