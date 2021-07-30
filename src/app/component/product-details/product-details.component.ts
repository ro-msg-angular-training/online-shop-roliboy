import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { AddCartItem, AddCartItemSuccess, CartActionTypes, IncrementCartItemSuccess } from 'src/app/store/action/cart.action';
import { ShowNotification } from 'src/app/store/action/notification.action';
import {
  DeleteProduct,
  DeleteProductSuccess,
  ProductActionTypes,
  GetProduct,
} from 'src/app/store/action/product.action';
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
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product$ = this.store.pipe(select(selectSelectedProduct));
  isAdmin$ = this.store.pipe(select(selectIsAdmin));
  isCustomer$ = this.store.pipe(select(selectIsCustomer));
  productDeletedSubscription$ = new Subscription();
  productAddedToCartSubscription$ = new Subscription();

  id: number = 0;
  isDeleteModalShown: boolean = false;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.store.dispatch(new GetProduct(this.id));

    this.productDeletedSubscription$ = this.actionsSubject$
      .pipe(
        ofType<DeleteProductSuccess>(ProductActionTypes.DeleteProductSuccess)
      )
      .subscribe((event) => {
        this.productDeletedSubscription$.unsubscribe();
        this.store.dispatch(
          new ShowNotification({
            title: 'Product Deleted',
            content: `product ${event.payload} was deleted successfully`,
            created: new Date().getTime(),
            timeout: 2500,
            type: 'success',
          })
        );
        this.router.navigate(['products']);
      });

    this.productAddedToCartSubscription$ = this.actionsSubject$
      .pipe(
        ofType(CartActionTypes.AddCartItemSuccess, CartActionTypes.IncrementCartItemSuccess)
      )
      .subscribe((event: AddCartItemSuccess | IncrementCartItemSuccess) => {
        this.store.dispatch(
          new ShowNotification({
            title: 'Product Added to Cart',
            content: `product ${event.payload} was added to your cart`,
            created: new Date().getTime(),
            timeout: 2500,
            type: 'success',
          })
        );
      });
  }

  ngOnDestroy(): void {
    this.productAddedToCartSubscription$.unsubscribe();
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
