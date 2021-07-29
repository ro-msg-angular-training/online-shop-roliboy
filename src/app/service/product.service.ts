import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.apiUrl}/products`);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>(
      `${environment.apiUrl}/products`,
      product
    );
  }

  retrieveProduct(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(
      `${environment.apiUrl}/products/${id}`
    );
  }

  updateProduct(product: IProduct): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.apiUrl}/products/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/products/${id}`);
  }
}
