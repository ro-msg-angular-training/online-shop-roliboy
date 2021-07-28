import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { AuthService } from '../../service/auth.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: Product[] = []

  constructor(
    private authService: AuthService,
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

  isAdmin(): boolean {
    return this.authService.isAdmin()
  }

  isCustomer(): boolean {
    return this.authService.isCustomer()
  }
}
