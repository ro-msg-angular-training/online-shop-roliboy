import { Component, OnDestroy, OnInit } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  ECartActions,
  PlaceOrder,
  PlaceOrderSuccess,
  RemoveCartItem,
} from 'src/app/store/action/cart.action';
import { selectUser } from 'src/app/store/selector/auth.selector';
import { selectCartItemsWithProductData } from 'src/app/store/selector/cart.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems$ = this.store.pipe(select(selectCartItemsWithProductData));
  authenticatedUserSubscription$ = new Subscription();
  orderRegisteredSubscription$ = new Subscription();

  username?: string;

  constructor(
    private store: Store<IAppState>,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit(): void {
    // TODO: find a way to avoid doing this
    this.authenticatedUserSubscription$ = this.store
      .pipe(select(selectUser))
      .subscribe((user) => (this.username = user?.username));

    this.orderRegisteredSubscription$ = this.actionsSubject$
      .pipe(ofType<PlaceOrderSuccess>(ECartActions.PlaceOrderSuccess))
      .subscribe(() => {
        // TODO: use html element instead alert to notify the user
        alert('order submitted');
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
    if (this.username === undefined) return;
    this.store.dispatch(new PlaceOrder());
  }
}
