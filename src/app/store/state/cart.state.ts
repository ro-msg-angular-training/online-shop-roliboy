import { CartItem } from 'src/app/model/cart-item.model';

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};
