import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  AddCartItem,
  AddCartItemSuccess,
  CartActionTypes,
  IncrementCartItemSuccess,
  PlaceOrder,
  PlaceOrderError,
  PlaceOrderSuccess,
  RemoveCartItem,
  RemoveCartItemSuccess,
} from '../action/cart.action';
import { AppState } from '../state/app.state';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { selectCartItems } from '../reducer/cart.reducer';
import { selectUser } from '../reducer/auth.reducer';
import { ShowNotification } from '../action/notification.action';

@Injectable()
export class CartEffects {
  constructor(
    private _actions$: Actions,
    private _service: OrderService,
    private _store: Store<AppState>
  ) {}

  addCartItem$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<AddCartItem>(CartActionTypes.AddCartItem),
      map((action) => action.payload),
      withLatestFrom(this._store.select(selectCartItems)),
      switchMap(([item, cartItems]) => {
        if (cartItems.find(cartItem => cartItem.productId == item))
          return of(new IncrementCartItemSuccess(item))
        else
          return of(new AddCartItemSuccess(item))
      }),
      switchMap(action => [
        new ShowNotification({
          title: 'Product Added to Cart',
          content: `product ${action.payload} was added to your cart`,
          created: new Date().getTime(),
          timeout: 2500,
          type: 'success',
        }),
        action
      ])
    );
  });

  removeCartItem$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<RemoveCartItem>(CartActionTypes.RemoveCartItem),
      map((action) => action.payload),
      switchMap((item) => [
        new ShowNotification({
          title: 'Item Removed',
          content: 'item was removed from the cart',
          created: new Date().getTime(),
          timeout: 2500,
          type: 'success',
        }),
        new RemoveCartItemSuccess(item)
      ])
    );
  });

  placeOrder$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<PlaceOrder>(CartActionTypes.PlaceOrder),
      withLatestFrom(
        this._store.select(selectCartItems),
        this._store.select(selectUser)
      ),
      switchMap(([action, items, user]) =>
        this._service.createOrder(items, user?.username).pipe(
          switchMap((message) => [
            new ShowNotification({
              title: 'Order Placed',
              content: 'order was submitted successfully',
              created: new Date().getTime(),
              timeout: 5000,
              type: 'success',
            }),
            new PlaceOrderSuccess()
          ]),
          catchError((error) => of(new PlaceOrderError()))
        )
      )
    );
  });
}
