import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.scss'],
})
export class ProductInputFormComponent implements OnInit {
  @Input('product')
  product?: Product | null

  @Output('onSubmit')
  submitEmitter = new EventEmitter<Product>();

  @Output('onCancel')
  cancelEmitter = new EventEmitter<void>();

  productForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    price: [0, Validators.required],
    description: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.product)
      this.productForm.patchValue(this.product)
  }

  onSubmit(): void {
    this.submitEmitter.emit(this.productForm.value)
  }

  onCancel(): void {
    this.cancelEmitter.emit()
  }
}
