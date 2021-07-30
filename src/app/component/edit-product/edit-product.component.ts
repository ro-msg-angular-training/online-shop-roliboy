import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import {
  ProductActionTypes,
  GetProduct,
  UpdateProduct,
  UpdateProductSuccess,
} from 'src/app/store/action/product.action';
import { selectSelectedProduct } from 'src/app/store/reducer/product.reducer';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  product$ = this.store.pipe(select(selectSelectedProduct));
  productUpdatedSubscription$ = new Subscription();
  productChangeSubscription$ = new Subscription();
  productForm$ = this.product$.pipe(
    map((product) =>
      this.fb.group({
        id: [product?.id],
        name: [product?.name, Validators.required],
        category: [product?.category, Validators.required],
        image: [product?.image, Validators.required],
        price: [product?.price, Validators.required],
        description: [product?.description, Validators.required],
      })
    )
  );

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.store.dispatch(new GetProduct(id));

    this.productUpdatedSubscription$ = this.actionsSubject$
      .pipe(
        ofType<UpdateProductSuccess>(ProductActionTypes.UpdateProductSuccess)
      )
      .subscribe(() => {
        this.productUpdatedSubscription$.unsubscribe();
        this.location.back();
      });
  }

  onFormSubmit(product: Product): void {
    this.store.dispatch(new UpdateProduct(product));
  }

  onFormCancel(): void {
    this.location.back();
  }
}
