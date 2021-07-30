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
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems$ = this.store.pipe(select(selectCartItemsWithProductData));
  orderRegisteredSubscription$ = new Subscription();
  cartItemRemovedSubscription$ = new Subscription();

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

    this.cartItemRemovedSubscription$ = this.actionsSubject$
      .pipe(ofType<RemoveCartItemSuccess>(CartActionTypes.RemoveCartItemSuccess))
      .subscribe(() => {
        this.store.dispatch(
          new ShowNotification({
            title: 'Item Removed',
            content: 'item was removed from the cart',
            created: new Date().getTime(),
            timeout: 1000,
            type: 'success',
          })
        );
      });
  }

  ngOnDestroy(): void {
    this.orderRegisteredSubscription$.unsubscribe();
    this.cartItemRemovedSubscription$.unsubscribe();
  }

  removeProduct(id: number): void {
    this.store.dispatch(new RemoveCartItem(id));
  }

  checkout(): void {
    this.store.dispatch(new PlaceOrder());
  }
}
