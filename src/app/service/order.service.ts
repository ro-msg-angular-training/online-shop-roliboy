import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../model/cart-item.model';
import { OrderItem } from '../model/order-item.model';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiRoot: string = 'http://localhost:3000'
  private cartItems: CartItem[] = []

  constructor(
    private httpClient: HttpClient
  ) { }

  // TODO: refactor
  addProduct(product: Product): void {
    let item = this.cartItems.find(item => item.productId == product.id)
    if (item == undefined)
      this.cartItems.push(new CartItem(product.id, product.name, product.category, product.price, 1))
    else
      item.quantity += 1
  }

  // TODO: refactor
  removeProduct(productId: number): void {
    let item = this.cartItems.find(item => item.productId == productId)
    let itemIndex = this.cartItems.findIndex(item => item.productId == productId)
    if (item == undefined)
      return
    item.quantity -= 1
    if (item.quantity == 0)
      this.cartItems.splice(itemIndex, 1)
  }

  getCartItems(): CartItem[] {
    return this.cartItems
  }

  createOrder(username: string): Observable<any> {
    let customer = username
    let products = this.cartItems.map(item => new OrderItem(item.productId, item.quantity))
    this.cartItems = []
    return this.httpClient.post(`${this.apiRoot}/orders`, {customer, products}, {responseType: 'text'})
  }
}
