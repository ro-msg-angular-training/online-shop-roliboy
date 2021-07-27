import { Component } from '@angular/core';
import { Product } from '../app.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  product: Product = new Product()
  isDeleteModalShown: Boolean = false

  constructor() {
    this.product = new Product(0, 'product 1', 'category 1', 'https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg', 100, 'description 1')
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
