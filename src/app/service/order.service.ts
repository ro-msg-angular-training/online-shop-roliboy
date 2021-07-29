import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICartItem } from '../model/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  createOrder(products: ICartItem[], customer?: string): Observable<string> {
    return this.httpClient.post(
      `${environment.apiUrl}/orders`,
      { customer, products },
      { responseType: 'text' }
    );
  }
}
