import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import {
  AddProduct,
  AddProductSuccess,
  ProductActionTypes,
} from 'src/app/store/action/product.action';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  productAddedSubscription$ = new Subscription();

  constructor(
    private store: Store<AppState>,
    private location: Location,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit(): void {
    this.productAddedSubscription$ = this.actionsSubject$
      .pipe(ofType<AddProductSuccess>(ProductActionTypes.AddProductSuccess))
      .subscribe(() => {
        // TODO: use html element instead alert to notify the user
        alert('product created');
      });
  }

  ngOnDestroy(): void {
    this.productAddedSubscription$.unsubscribe();
  }

  onFormCancel(): void {
    this.location.back();
  }

  onFormSubmit(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }
}
