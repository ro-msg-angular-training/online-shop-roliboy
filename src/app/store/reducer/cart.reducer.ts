import { ICartItem } from 'src/app/model/cart-item.model';
import { CartActions, ECartActions } from '../action/cart.action';
import { ICartState, initialCartState } from '../state/cart.state';

export const cartReducer = (
  state = initialCartState,
  action: CartActions
): ICartState => {
  switch (action.type) {
    case ECartActions.AddCartItemSuccess: {
      let item = state.items.find((item) => item.productId == action.payload);
      let items: ICartItem[] = [];

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
    case ECartActions.RemoveCartItemSuccess: {
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
    case ECartActions.PlaceOrderSuccess: {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
};
