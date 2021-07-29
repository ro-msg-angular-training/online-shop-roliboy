import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddProduct } from 'src/app/store/action/product.action';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  productName: string = ''
  productForm = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(
    private store: Store<IAppState>,
    private location: Location,
    private fb: FormBuilder
  ) { }

  onSubmit(): void {
    this.store.dispatch(new AddProduct({
      id: 0,
      name: this.productForm.value.name,
      category: this.productForm.value.category,
      image: this.productForm.value.image,
      price: this.productForm.value.price,
      description: this.productForm.value.description
    }))
    // TODO: only do this on success
    this.location.back()
  }

  onCancel(): void {
    this.location.back()
  }
}
