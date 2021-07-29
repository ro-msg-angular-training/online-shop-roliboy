import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiRoot: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.apiRoot}/products`);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>(`${this.apiRoot}/products`, product);
  }

  retrieveProduct(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.apiRoot}/products/${id}`);
  }

  updateProduct(product: IProduct): Observable<any> {
    return this.httpClient.put(
      `${this.apiRoot}/products/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiRoot}/products/${id}`);
  }
}
