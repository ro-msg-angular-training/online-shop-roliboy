import { Component, OnDestroy, OnInit } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  CartActionTypes,
  PlaceOrder,
  PlaceOrderSuccess,
  RemoveCartItem,
  RemoveCartItemSuccess,
} from 'src/app/store/action/cart.action';
import { ShowNotification } from 'src/app/store/action/notification.action';
import { selectCartItemsWithProductData } from 'src/app/store/reducer/cart.reducer';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  cartItems$ = this.store.pipe(select(selectCartItemsWithProductData));

  constructor(
    private store: Store<AppState>
  ) {}

  removeProduct(id: number): void {
    this.store.dispatch(new RemoveCartItem(id));
  }

  checkout(): void {
    this.store.dispatch(new PlaceOrder());
  }
}
