import { Component, OnDestroy, OnInit } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  CartActionTypes,
  PlaceOrder,
  PlaceOrderSuccess,
  RemoveCartItem,
} from 'src/app/store/action/cart.action';
import { ShowNotification } from 'src/app/store/action/notification.action';
import { selectCartItemsWithProductData } from 'src/app/store/reducer/cart.reducer';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems$ = this.store.pipe(select(selectCartItemsWithProductData));
  authenticatedUserSubscription$ = new Subscription();
  orderRegisteredSubscription$ = new Subscription();

  constructor(
    private store: Store<AppState>,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit(): void {
    this.orderRegisteredSubscription$ = this.actionsSubject$
      .pipe(ofType<PlaceOrderSuccess>(CartActionTypes.PlaceOrderSuccess))
      .subscribe(() => {
        this.store.dispatch(
          new ShowNotification({
            title: 'Order Placed',
            content: 'order was submitted successfully',
            created: new Date().getTime(),
            timeout: 5000,
            type: 'success',
          })
        );
      });
  }

  ngOnDestroy(): void {
    this.authenticatedUserSubscription$.unsubscribe();
    this.orderRegisteredSubscription$.unsubscribe();
  }

  removeProduct(id: number): void {
    this.store.dispatch(new RemoveCartItem(id));
  }

  checkout(): void {
    this.store.dispatch(new PlaceOrder());
  }
}
