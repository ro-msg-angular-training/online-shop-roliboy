import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import { GetProduct, UpdateProduct } from 'src/app/store/action/product.action';
import { selectSelectedProduct } from 'src/app/store/reducer/product.reducer';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  product$ = this.store.pipe(select(selectSelectedProduct));

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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.store.dispatch(new GetProduct(id));
  }

  onFormSubmit(product: Product): void {
    this.store.dispatch(new UpdateProduct(product));
  }

  onFormCancel(): void {
    this.location.back();
  }
}
