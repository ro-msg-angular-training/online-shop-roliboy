import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../app.model';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
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
    private authService: AuthService,
    private productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
    this.router.navigate(['products', this.product.id, 'edit'])
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.id).subscribe(result =>
      this.router.navigate(['products']))
  }

  addToCart(): void {
    this.orderService.addProduct(this.product)
  }

  isAdmin(): boolean {
    return this.authService.isAdmin()
  }

  isCustomer(): boolean {
    return this.authService.isCustomer()
  }
}
