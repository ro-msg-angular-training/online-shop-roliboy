import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartItem } from '../model/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiRoot: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  createOrder(products: ICartItem[], customer?: string): Observable<string> {
    return this.httpClient.post(
      `${this.apiRoot}/orders`,
      { customer, products },
      { responseType: 'text' }
    );
  }
}
