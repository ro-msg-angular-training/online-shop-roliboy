import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../app.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  product: Product = new Product()
  isDeleteModalShown: Boolean = false

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params =>
      productService.retrieveProduct(params['id']).subscribe(product =>
        this.product = product))
  }

  showDeleteModal(): void {
    this.isDeleteModalShown = true
  }
  
  hideDeleteModal(): void {
    this.isDeleteModalShown = false
  }

  editProduct(): void {
  }

  deleteProduct(): void {
  }

  addToCart(): void {
  }
}
