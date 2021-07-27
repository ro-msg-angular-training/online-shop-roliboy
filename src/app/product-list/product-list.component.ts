import { Component } from '@angular/core';
import { Product } from '../app.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: Product[] = []

  constructor() {
    this.products = [
      new Product(0, 'product 1', 'category 1', 'https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg', 100, 'description 1'),
      new Product(0, 'product 1', 'category 1', 'https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg', 100, 'description 1')
    ]
  }

  showProductDetails(id: number): void {
  }

  showShoppingCart(): void {
  }
}
