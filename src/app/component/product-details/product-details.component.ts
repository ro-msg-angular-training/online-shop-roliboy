import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AddCartItem } from 'src/app/store/action/cart.action';
import { DeleteProduct, GetProduct } from 'src/app/store/action/product.action';
import {
  selectIsAdmin,
  selectIsCustomer,
} from 'src/app/store/selector/auth.selector';
import { selectSelectedProduct } from 'src/app/store/selector/product.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product$ = this.store.pipe(select(selectSelectedProduct));
  isAdmin$ = this.store.pipe(select(selectIsAdmin));
  isCustomer$ = this.store.pipe(select(selectIsCustomer));

  productId?: number;
  isDeleteModalShown: boolean = false;

  constructor(
    private store: Store<IAppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>
      this.store.dispatch(new GetProduct(params['id']))
    );
    this.product$.subscribe((product) => (this.productId = product?.id));
  }

  showDeleteModal(): void {
    this.isDeleteModalShown = true;
  }

  hideDeleteModal(): void {
    this.isDeleteModalShown = false;
  }

  editProduct(): void {
    this.router.navigate(['products', this.productId, 'edit']);
  }

  deleteProduct(): void {
    if (this.productId === undefined) return;
    this.store.dispatch(new DeleteProduct(this.productId));
    this.router.navigate(['products']);
  }

  // TODO: notify user
  addToCart(): void {
    if (this.productId === undefined) return;
    this.store.dispatch(new AddCartItem(this.productId));
  }
}
