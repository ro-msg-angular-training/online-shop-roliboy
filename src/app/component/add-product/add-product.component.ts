import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';
import { AddProduct } from 'src/app/store/action/product.action';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
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
    private fb: FormBuilder
  ) {}

  onFormCancel(): void {
    this.location.back();
  }

  onFormSubmit(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }
}
