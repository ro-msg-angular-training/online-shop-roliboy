import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiRoot: string = 'http://localhost:3000'

  constructor(
    private httpClient: HttpClient
  ) { }

  createOrder() {
    console.warn('not implemented')
  }
}
