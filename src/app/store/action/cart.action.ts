import { Action } from '@ngrx/store';

export enum CartActionTypes {
  AddCartItem = '[cart] add item',
  AddCartItemSuccess = '[cart] add item success',
  RemoveCartItem = '[cart] remove item',
  RemoveCartItemSuccess = '[cart] remove item success',
  PlaceOrder = '[cart] place order',
  PlaceOrderSuccess = '[cart] place order success',
  PlaceOrderError = '[cart] place order error',
}

export class AddCartItem implements Action {
  public readonly type = CartActionTypes.AddCartItem;
  constructor(public payload: number) {}
}

export class AddCartItemSuccess implements Action {
  public readonly type = CartActionTypes.AddCartItemSuccess;
  constructor(public payload: number) {}
}

export class RemoveCartItem implements Action {
  public readonly type = CartActionTypes.RemoveCartItem;
  constructor(public payload: number) {}
}

export class RemoveCartItemSuccess implements Action {
  public readonly type = CartActionTypes.RemoveCartItemSuccess;
  constructor(public payload: number) {}
}

export class PlaceOrder implements Action {
  public readonly type = CartActionTypes.PlaceOrder;
}

export class PlaceOrderSuccess implements Action {
  public readonly type = CartActionTypes.PlaceOrderSuccess;
}

export class PlaceOrderError implements Action {
  public readonly type = CartActionTypes.PlaceOrderError;
}

export type CartActions =
  | AddCartItem
  | AddCartItemSuccess
  | RemoveCartItem
  | RemoveCartItemSuccess
  | PlaceOrder
  | PlaceOrderSuccess
  | PlaceOrderError;
