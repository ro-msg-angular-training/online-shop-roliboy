import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../app.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  cartItems: CartItem[] = []

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {
    this.cartItems = orderService.getCartItems()
  }

  removeProduct(id: number): void {
    this.orderService.removeProduct(id)
    this.cartItems = this.orderService.getCartItems()
  }

  checkout(): void {
    this.orderService.createOrder("doej").subscribe(result => {
      alert(result)
      this.router.navigate(['products'])
    })
  }
}
