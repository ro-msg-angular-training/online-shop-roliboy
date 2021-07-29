import { ICartItem } from "src/app/model/cart-item.model";

export interface ICartState {
    items: ICartItem[]
}

export const initialCartState: ICartState = {
    items: []
}