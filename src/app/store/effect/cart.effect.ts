import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  AddCartItem,
  AddCartItemSuccess,
  CartActionTypes,
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

@Injectable()
export class CartEffects {
  constructor(
    private _actions$: Actions,
    private _service: OrderService,
    private _store: Store<AppState>
  ) {}

  // ?
  addCartItem$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<AddCartItem>(CartActionTypes.AddCartItem),
      map((action) => action.payload),
      switchMap((item) => of(new AddCartItemSuccess(item)))
    );
  });

  removeCartItem$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<RemoveCartItem>(CartActionTypes.RemoveCartItem),
      map((action) => action.payload),
      switchMap((item) => of(new RemoveCartItemSuccess(item)))
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
          switchMap((message) => of(new PlaceOrderSuccess())),
          catchError((error) => of(new PlaceOrderError()))
        )
      )
    );
  });
}
