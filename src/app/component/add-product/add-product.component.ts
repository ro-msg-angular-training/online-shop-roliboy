import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ShowNotification } from 'src/app/store/action/notification.action';
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
        this.store.dispatch(
          new ShowNotification({
            title: 'Product Added',
            content: 'new product was added successfully',
            created: new Date().getTime(),
            timeout: 2500,
            type: 'success',
          })
        );
        this.location.back();
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
