import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiRoot: string = 'http://localhost:3000'

  constructor(
    private httpClient: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiRoot}/products`)
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiRoot}/products`, product)
  }

  retrieveProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiRoot}/products/${id}`)
  }

  updateProduct(product: Product): Observable<any> {
    return this.httpClient.put(`${this.apiRoot}/products/${product.id}`, product)
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiRoot}/products/${id}`)
  }
}
