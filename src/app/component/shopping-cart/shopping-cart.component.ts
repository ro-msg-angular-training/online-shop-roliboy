import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PlaceOrder, RemoveCartItem } from 'src/app/store/action/cart.action';
import { selectUser } from 'src/app/store/selector/auth.selector';
import { selectCartItemsWithProductData } from 'src/app/store/selector/cart.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems$ = this.store.pipe(select(selectCartItemsWithProductData));
  username?: string;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectUser))
      .subscribe((user) => (this.username = user?.username));
  }

  removeProduct(id: number): void {
    this.store.dispatch(new RemoveCartItem(id));
  }

  checkout(): void {
    if (this.username === undefined) return;
    this.store.dispatch(new PlaceOrder());
    alert('order submitted');
  }
}
