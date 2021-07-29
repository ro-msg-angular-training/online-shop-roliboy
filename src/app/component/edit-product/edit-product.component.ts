import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GetProduct, UpdateProduct } from 'src/app/store/action/product.action';
import { selectSelectedProduct } from 'src/app/store/selector/product.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  product$ = this.store.pipe(select(selectSelectedProduct));

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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) =>
      this.store.dispatch(new GetProduct(params['id']))
    );
    this.product$.subscribe((product) => {
      if (!product) return;
      this.productForm.patchValue(product);
    });
  }

  onSubmit(): void {
    this.store.dispatch(new UpdateProduct(this.productForm.value));
    // TODO: on success
    this.location.back();
  }

  onCancel(): void {
    this.location.back();
  }
}
