import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.scss'],
})
export class ProductInputFormComponent implements OnInit {
  @Input('form')
  productForm = new FormGroup({})

  @Output('onSubmit')
  submitEmitter = new EventEmitter<Product>();

  @Output('onCancel')
  cancelEmitter = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitEmitter.emit(this.productForm?.value)
  }

  onCancel(): void {
    this.cancelEmitter.emit()
  }
}
