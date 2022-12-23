import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as e from 'express';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  endpoint = 'http://localhost:3002/api/generators';

  constructor(private http: HttpClient) { }

  all():Observable<any> {
    return this.http.get(this.endpoint);
  }

  create(data: any): Observable<Product> {
    return this.http.post<Product>(this.endpoint, data);
  }

  delete(id: string):Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
