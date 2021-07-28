import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product.service';

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
    private productService: ProductService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  onSubmit(): void {
    this.productService.createProduct(new Product(
      0,
      this.productForm.value.name,
      this.productForm.value.category,
      this.productForm.value.image,
      this.productForm.value.price,
      this.productForm.value.description)).subscribe(response =>
        this.location.back())
  }

  onCancel(): void {
    this.location.back()
  }
}
