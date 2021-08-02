import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AddCartItem } from 'src/app/store/action/cart.action';
import { DeleteProduct, GetProduct } from 'src/app/store/action/product.action';
import {
  selectIsAdmin,
  selectIsCustomer,
} from 'src/app/store/reducer/auth.reducer';
import { selectSelectedProduct } from 'src/app/store/reducer/product.reducer';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product$ = this.store.pipe(select(selectSelectedProduct));
  isAdmin$ = this.store.pipe(select(selectIsAdmin));
  isCustomer$ = this.store.pipe(select(selectIsCustomer));
  productAddedToCartSubscription$ = new Subscription();

  id: number = 0;
  isDeleteModalShown: boolean = false;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.store.dispatch(new GetProduct(this.id));
  }

  showDeleteModal(): void {
    this.isDeleteModalShown = true;
  }

  hideDeleteModal(): void {
    this.isDeleteModalShown = false;
  }

  editProduct(): void {
    this.router.navigate(['products', this.id, 'edit']);
  }

  deleteProduct(): void {
    this.store.dispatch(new DeleteProduct(this.id));
  }

  addToCart(): void {
    this.store.dispatch(new AddCartItem(this.id));
  }
}
