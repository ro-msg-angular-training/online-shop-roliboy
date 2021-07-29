import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/products`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      `${environment.apiUrl}/products`,
      product
    );
  }

  retrieveProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(
      `${environment.apiUrl}/products/${id}`
    );
  }

  updateProduct(product: Product): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.apiUrl}/products/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/products/${id}`);
  }
}
