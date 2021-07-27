import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../app.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: Product[] = []

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    productService.getProducts().subscribe(products =>
      this.products = products)
  }

  showProductDetails(id: number): void {
    this.router.navigate(['products', id])
  }

  showShoppingCart(): void {
    this.router.navigate(['cart'])
  }

  showAddProduct(): void {
    this.router.navigate(['products', 'add'])
  }
}
