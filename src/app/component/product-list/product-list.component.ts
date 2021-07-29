import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GetProducts } from 'src/app/store/action/product.action';
import {
  selectIsAdmin,
  selectIsCustomer,
} from 'src/app/store/selector/auth.selector';
import { selectProductList } from 'src/app/store/selector/product.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$ = this.store.pipe(select(selectProductList));
  isAdmin$ = this.store.pipe(select(selectIsAdmin));
  isCustomer$ = this.store.pipe(select(selectIsCustomer));

  constructor(private store: Store<IAppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
  }

  showProductDetails(id: number): void {
    this.router.navigate(['products', id]);
  }

  showShoppingCart(): void {
    this.router.navigate(['cart']);
  }

  showAddProduct(): void {
    this.router.navigate(['products', 'add']);
  }
}
