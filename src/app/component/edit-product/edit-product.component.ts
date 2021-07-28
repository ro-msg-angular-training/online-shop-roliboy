import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  productId: number = 0
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
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.activatedRoute.params.subscribe(params =>
      productService.retrieveProduct(params['id']).subscribe(product => {
        this.productId = params['id']
        this.productName = product.name
        this.productForm.controls['name'].setValue(product.name)
        this.productForm.controls['category'].setValue(product.category)
        this.productForm.controls['image'].setValue(product.image)
        this.productForm.controls['price'].setValue(product.price)
        this.productForm.controls['description'].setValue(product.description)
      }))
  }

  onSubmit(): void {
    this.productService.updateProduct(new Product(
      this.productId,
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
