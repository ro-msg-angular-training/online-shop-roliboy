import { Action } from "@ngrx/store";
import { ICartItem } from "src/app/model/cart-item.model";

export enum ECartActions {
    AddCartItem = '[cart] add item',
    AddCartItemSuccess = '[cart] add item success',
    RemoveCartItem = '[cart] remove item',
    RemoveCartItemSuccess = '[cart] remove item success',
    PlaceOrder = '[cart] place order',
    PlaceOrderSuccess = '[cart] place order success',
    PlaceOrderError = '[cart] place order error'
}

export class AddCartItem implements Action {
    public readonly type = ECartActions.AddCartItem
    constructor(public payload: number) {}
}

export class AddCartItemSuccess implements Action {
    public readonly type = ECartActions.AddCartItemSuccess
    constructor(public payload: number) {}
}

export class RemoveCartItem implements Action {
    public readonly type = ECartActions.RemoveCartItem
    constructor(public payload: number) {}
}

export class RemoveCartItemSuccess implements Action {
    public readonly type = ECartActions.RemoveCartItemSuccess
    constructor(public payload: number) {}
}

export class PlaceOrder implements Action {
    public readonly type = ECartActions.PlaceOrder
}

export class PlaceOrderSuccess implements Action {
    public readonly type = ECartActions.PlaceOrderSuccess
}

export class PlaceOrderError implements Action {
    public readonly type = ECartActions.PlaceOrderError
}


export type CartActions = AddCartItem | AddCartItemSuccess | RemoveCartItem | RemoveCartItemSuccess | PlaceOrder | PlaceOrderSuccess | PlaceOrderError