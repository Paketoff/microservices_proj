import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {

  endpoint = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  all():Observable<any> {
    return this.http.get(this.endpoint);
  }

  get(id: number):Observable<any> {
    return this.http.get<any>(`${this.endpoint}/${id}`);
  }

  create(data: any): Observable<Order> {
    return this.http.post<Order>(this.endpoint, data);
  }

  delete(id: string):Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
