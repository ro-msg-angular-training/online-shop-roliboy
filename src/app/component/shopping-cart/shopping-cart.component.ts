import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartItem } from '../../model/cart-item.model';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  cartItems: CartItem[] = []

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartItems = orderService.getCartItems()
  }

  removeProduct(id: number): void {
    this.orderService.removeProduct(id)
    this.cartItems = this.orderService.getCartItems()
  }

  checkout(): void {
    const user = this.authService.getUser()
    if (user == null)
      return
    this.orderService.createOrder(user.username).subscribe(result => {
      alert(result)
      this.router.navigate(['products'])
    })
  }
}
