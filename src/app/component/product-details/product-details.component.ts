import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/model/product.model';
import { AddCartItem } from 'src/app/store/action/cart.action';
import { DeleteProduct, DeleteProductSuccess, EProductActions, GetProduct } from 'src/app/store/action/product.action';
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
  productDeletedSubscription$ = new Subscription();

  id: number = 0;
  isDeleteModalShown: boolean = false;

  constructor(
    private store: Store<IAppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.store.dispatch(new GetProduct(this.id));

    this.productDeletedSubscription$ = this.actionsSubject$
      .pipe(ofType<DeleteProductSuccess>(EProductActions.DeleteProductSuccess))
      .subscribe(() => {
        this.productDeletedSubscription$.unsubscribe();
        // TODO: use html element instead alert to notify the user
        alert('product deleted');
        this.router.navigate(['products']);
      });
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
