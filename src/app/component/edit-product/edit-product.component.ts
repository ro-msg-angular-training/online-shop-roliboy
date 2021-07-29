import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  EProductActions,
  GetProduct,
  UpdateProduct,
  UpdateProductSuccess,
} from 'src/app/store/action/product.action';
import { selectSelectedProduct } from 'src/app/store/selector/product.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, OnDestroy {
  product$ = this.store.pipe(select(selectSelectedProduct));
  productUpdatedSubscription$ = new Subscription();
  productChangeSubscription$ = new Subscription();

  productForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    price: [0, Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private store: Store<IAppState>,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private actionsSubject$: ActionsSubject
  ) {}

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.store.dispatch(new GetProduct(id));

    this.productChangeSubscription$ = this.product$.subscribe((product) => {
      // TODO: get rid of this check somehow
      if (!product) return;
      this.productForm.patchValue(product);
    });

    this.productUpdatedSubscription$ = this.actionsSubject$
      .pipe(ofType<UpdateProductSuccess>(EProductActions.UpdateProductSuccess))
      .subscribe(() => {
        this.productUpdatedSubscription$.unsubscribe();
        this.location.back();
      });
  }

  ngOnDestroy(): void {
    this.productChangeSubscription$.unsubscribe();
  }

  onSubmit(): void {
    this.store.dispatch(new UpdateProduct(this.productForm.value));
  }

  onCancel(): void {
    this.location.back();
  }
}
