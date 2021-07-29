import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GetProduct, UpdateProduct } from 'src/app/store/action/product.action';
import { selectSelectedProduct } from 'src/app/store/selector/product.selector';
import { IAppState } from 'src/app/store/state/app.state';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product$ = this.store.pipe(select(selectSelectedProduct))
  productId: number = 0

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
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>
      this.store.dispatch(new GetProduct(params['id'])))
    this.product$.subscribe(product => {
      if (!product) return
      this.productId = product.id
      this.productForm.controls['name'].setValue(product.name)
      this.productForm.controls['category'].setValue(product.category)
      this.productForm.controls['image'].setValue(product.image)
      this.productForm.controls['price'].setValue(product.price)
      this.productForm.controls['description'].setValue(product.description)
    })
  }

  onSubmit(): void {
    this.store.dispatch(new UpdateProduct({
      id: this.productId,
      name: this.productForm.value.name,
      category: this.productForm.value.category,
      image: this.productForm.value.image,
      price: this.productForm.value.price,
      description: this.productForm.value.description
    }))
    // TODO: on success
    this.location.back()
  }

  onCancel(): void {
    this.location.back()
  }
}
