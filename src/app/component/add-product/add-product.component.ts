import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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

  productForm = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private store: Store<AppState>,
    private location: Location,
    private fb: FormBuilder,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit(): void {
    this.productAddedSubscription$ = this.actionsSubject$
      .pipe(ofType<AddProductSuccess>(ProductActionTypes.AddProductSuccess))
      .subscribe(() => {
        // TODO: use html element instead alert to notify the user
        alert('product created');
        this.productForm.reset();
      });
  }

  ngOnDestroy(): void {
    this.productAddedSubscription$.unsubscribe();
  }

  onSubmit(): void {
    this.store.dispatch(new AddProduct(this.productForm.value));
  }

  onCancel(): void {
    this.location.back();
  }
}
