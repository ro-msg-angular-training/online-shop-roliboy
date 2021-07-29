import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  AddCartItem,
  AddCartItemSuccess,
  ECartActions,
  PlaceOrder,
  PlaceOrderError,
  PlaceOrderSuccess,
  RemoveCartItem,
  RemoveCartItemSuccess,
} from '../action/cart.action';
import { IAppState } from '../state/app.state';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectCartItems } from '../selector/cart.selector';
import { of } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { selectUser } from '../selector/auth.selector';

@Injectable()
export class CartEffects {
  constructor(
    private _actions$: Actions,
    private _service: OrderService,
    private _store: Store<IAppState>
  ) {}

  // ?
  addCartItem$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<AddCartItem>(ECartActions.AddCartItem),
      map((action) => action.payload),
      switchMap((item) => of(new AddCartItemSuccess(item)))
    );
  });

  removeCartItem$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<RemoveCartItem>(ECartActions.RemoveCartItem),
      map((action) => action.payload),
      switchMap((item) => of(new RemoveCartItemSuccess(item)))
    );
  });

  placeOrder$ = createEffect(() => {
    return this._actions$.pipe(
      ofType<PlaceOrder>(ECartActions.PlaceOrder),
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
